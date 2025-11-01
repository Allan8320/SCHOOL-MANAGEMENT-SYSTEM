const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

// Load environment variables
dotenv.config();

// Port setup for Render / local
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ NOT CONNECTED TO DATABASE:", err));

// Default route for root URL
app.get("/", (req, res) => {
  res.send("✅ School Management System Backend is Running Successfully on Render!");
});

// API routes
app.use("/api", Routes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
