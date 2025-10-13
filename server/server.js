const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/connectors", (req, res) => {
  res.json([
    { id: 1, name: "Google Sheets", status: "available" },
    { id: 2, name: "Salesforce", status: "available" },
    { id: 3, name: "PostgreSQL", status: "available" }
  ]);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (
    (email === "admin@dataflowsync.com" && password === "Admin@123") ||
    (email === "admin@demo.com" && password === "password")
  ) {
    res.json({ token: "mock-jwt-token", user: { name: "Admin User", email } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Mock backend running on port ${PORT}`));
