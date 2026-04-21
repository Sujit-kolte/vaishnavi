require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Smart Resume Builder Backend ✅",
    status: "operational",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(
    `📝 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`,
  );
  console.log(`🔑 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

module.exports = app;
