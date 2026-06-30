# FixMyHome 🏠

> **On-demand property maintenance, matched by proximity.**

FixMyHome is a synchronized, full-stack digital marketplace designed to streamline local property maintenance. [cite_start]Built incrementally across a 10-lab curriculum, the platform bridges the gap between neighborhood homeowners and local independent tradespeople by replacing fragmented manual listings with a transparent, trackable location-based ecosystem.

---

## 🛠️ Tech Stack & Ecosystem

The core application architecture leverages a modern unified framework environment:
* **Frontend:** HTML5, Tailwind CSS, Font Awesome
* **Client State & SPA:** React.js
* **Backend Services:** Node.js, Express.js
* **Database Infrastructure:** MongoDB (NoSQL Relational Schemas)
* **Framework Optimization:** Next.js (Hybrid SSR/CSR Rendering Architecture)

---

## 🏁 Curriculum Lab Milestones

This repository maps directly to the required course exercises. The modules track incremental development:

### Module 1: Interactive Frontend & Full-Stack Portal
* **Lab 1 (Tailwind Responsive Layout):** Core landing page and marketplace structure utilizing semantic structural blocks and the Tailwind Typography plugin.
* **Lab 2 (HTML5 APIs):** Interactive integration of the native browser Geolocation API for proximity tracking and a Drag-and-Drop container for damage uploads.
* **Lab 3 (Event Handling):** Client-side pricing estimation tool powered by raw JavaScript event streams (`input`, `change`).
* **Lab 4 (Express.js Portal Services):** Secure session-based login, role-based registration (Homeowner / Service Provider), and a high-density administrator control panel powered by Express.js and local JSON database storage.

---

## 📂 Project Structure

```text
FixMyHome/
├── assets/                  # Public asset collections (images, icons, fonts)
├── data/                    # Local JSON database registry (users, bookings)
├── index.html               # Platform master landing page
├── login.html               # Secure homeowner & provider portal login page
├── register.html            # Role-aware provider & user sign-up page
├── admin.html               # Live admin control panel & logs stream
├── app.js                   # Express application setup, routes & controllers
├── server.js                # Core server entry listener point (Node.js)
└── package.json             # Service package configuration & scripts
```
