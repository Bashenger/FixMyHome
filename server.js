const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🏠 FixMyHome Full-Stack Server Running Successfully`);
  console.log(`🔌 URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
