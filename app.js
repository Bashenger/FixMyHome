const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware for parsing request payload structures
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session handling setup
app.use(session({
  secret: 'fixmyhome-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Resolve paths to database JSON files
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Self-healing database directories and file seeding
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Utility to read JSON database files safely
function readDb(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Utility to write JSON database files safely
function writeDb(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Seeding standard users if USERS_FILE is empty
if (!fs.existsSync(USERS_FILE) || readDb(USERS_FILE).length === 0) {
  const seedUsers = [
    {
      id: "u-01",
      email: "admin@fixmyhome.com",
      password: bcrypt.hashSync("admin", 10),
      name: "Administrator",
      role: "admin",
      specialty: "",
      license: ""
    },
    {
      id: "u-02",
      email: "user@fixmyhome.com",
      password: bcrypt.hashSync("user", 10),
      name: "John Homeowner",
      role: "homeowner",
      specialty: "",
      license: ""
    },
    {
      id: "u-03",
      email: "provider@fixmyhome.com",
      password: bcrypt.hashSync("provider", 10),
      name: "Arjun Sharma",
      role: "provider",
      specialty: "Plumbing Solutions",
      license: "LIC-PL-77889"
    }
  ];
  writeDb(USERS_FILE, seedUsers);
  console.log("Seeded database with initial user registry.");
}

// Seeding standard bookings if BOOKINGS_FILE is empty
if (!fs.existsSync(BOOKINGS_FILE) || readDb(BOOKINGS_FILE).length === 0) {
  const seedBookings = [
    {
      id: "B-1001",
      name: "Meera Kapoor",
      phone: "+91 98765 43210",
      specialty: "Plumbing Solutions",
      urgency: "High",
      description: "Our kitchen basin started leaking uncontrollably late at night.",
      status: "Active",
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: "B-1002",
      name: "Amit Sen",
      phone: "+91 99988 87776",
      specialty: "Electrical Engineering",
      urgency: "Medium",
      description: "Short circuit assessment on living room spotlights.",
      status: "Completed",
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "B-1003",
      name: "Rohan Luthra",
      phone: "+91 77665 54433",
      specialty: "Carpentry & Structural",
      urgency: "Low",
      description: "Repair loose structural hinges on cabinet brackets.",
      status: "Active",
      date: new Date(Date.now() - 172800000).toISOString()
    }
  ];
  writeDb(BOOKINGS_FILE, seedBookings);
  console.log("Seeded database with sample bookings registry.");
}

// ----------------------------------------------------
// AUTHENTICATION AND ROLE MIDDLEWARE CONTROLS
// ----------------------------------------------------
function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Administrator privileges required." });
  }
}

// Intercept direct static file request for admin portal page
app.get('/admin.html', (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.redirect('/login.html?error=unauthorized');
  }
});

// ----------------------------------------------------
// REST API ROUTING PATHWAYS
// ----------------------------------------------------

// Get user session metadata
app.get('/api/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Register new user account
app.post('/api/register', (req, res) => {
  const { email, password, name, role, specialty, license } = req.body;
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: "Missing required registration parameters." });
  }

  const users = readDb(USERS_FILE);
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "Email already registered in system." });
  }

  const newUser = {
    id: `u-${Date.now()}`,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    name,
    role,
    specialty: role === 'provider' ? (specialty || 'General Maintenance') : '',
    license: role === 'provider' ? (license || 'N/A') : ''
  };

  users.push(newUser);
  writeDb(USERS_FILE, users);

  // Set account session info
  req.session.user = {
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    specialty: newUser.specialty,
    license: newUser.license
  };

  res.status(201).json({ success: true, user: req.session.user });
});

// Login credentials verification
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password inputs required." });
  }

  const users = readDb(USERS_FILE);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid email or password credentials." });
  }

  req.session.user = {
    email: user.email,
    name: user.name,
    role: user.role,
    specialty: user.specialty,
    license: user.license
  };

  res.json({ success: true, user: req.session.user });
});

// Logout clear session handler
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Could not destroy active session." });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// Book a new estimate/dispatch request
app.post('/api/bookings', (req, res) => {
  const { name, phone, specialty, urgency, description } = req.body;
  if (!name || !phone || !specialty) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  const bookings = readDb(BOOKINGS_FILE);
  const newBooking = {
    id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    phone,
    specialty,
    urgency: urgency || 'Medium',
    description: description || 'No description provided.',
    status: 'Active',
    date: new Date().toISOString()
  };

  bookings.push(newBooking);
  writeDb(BOOKINGS_FILE, bookings);

  res.status(201).json({ success: true, booking: newBooking });
});

// Provider join net request
app.post('/api/providers', (req, res) => {
  const { name, email, specialty, license } = req.body;
  if (!name || !email || !specialty || !license) {
    return res.status(400).json({ error: "Missing provider details." });
  }

  const users = readDb(USERS_FILE);
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (exists) {
    return res.status(400).json({ error: "Provider email already exists in registry." });
  }

  const newProvider = {
    id: `u-${Date.now()}`,
    email: email.toLowerCase(),
    password: bcrypt.hashSync("provider", 10), // default seed password
    name,
    role: "provider",
    specialty,
    license
  };

  users.push(newProvider);
  writeDb(USERS_FILE, users);

  res.status(201).json({ success: true });
});

// ----------------------------------------------------
// ADMINISTRATOR EXCLUSIVE DATA API CONTROLS
// ----------------------------------------------------

// Fetch stats overview
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const users = readDb(USERS_FILE);
  const bookings = readDb(BOOKINGS_FILE);

  const totalUsers = users.length;
  const activeBookings = bookings.filter(b => b.status === 'Active').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const activeProviders = users.filter(u => u.role === 'provider').length;

  res.json({
    totalUsers,
    activeBookings,
    completedBookings,
    activeProviders
  });
});

// Fetch all system bookings
app.get('/api/admin/bookings', requireAdmin, (req, res) => {
  const bookings = readDb(BOOKINGS_FILE);
  res.json(bookings);
});

// Delete/Cancel booking
app.delete('/api/admin/bookings/:id', requireAdmin, (req, res) => {
  const bookings = readDb(BOOKINGS_FILE);
  const filtered = bookings.filter(b => b.id !== req.params.id);
  
  if (bookings.length === filtered.length) {
    return res.status(404).json({ error: "Booking ID not found." });
  }

  writeDb(BOOKINGS_FILE, filtered);
  res.json({ success: true });
});

// Fetch all registered users
app.get('/api/admin/users', requireAdmin, (req, res) => {
  const users = readDb(USERS_FILE).map(u => {
    const { password, ...safeUser } = u;
    return safeUser;
  });
  res.json(users);
});

// Delete user profile
app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const users = readDb(USERS_FILE);
  const filtered = users.filter(u => u.id !== req.params.id && u.email !== req.params.id);

  if (users.length === filtered.length) {
    return res.status(404).json({ error: "User profile ID not found." });
  }

  // Prevent deleting the main admin profile for safety
  const toDelete = users.find(u => u.id === req.params.id || u.email === req.params.id);
  if (toDelete && toDelete.email === 'admin@fixmyhome.com') {
    return res.status(400).json({ error: "Protection protocol active: Root Administrator profile cannot be deleted." });
  }

  writeDb(USERS_FILE, filtered);
  res.json({ success: true });
});

// Serve static assets from root directory
app.use(express.static(__dirname));

module.exports = app;
