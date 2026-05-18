const express = require("express");
const cors = require("cors");

const feedRoutes = require("./routes/feedRoutes");

const app = express();

// 1. Enable CORS for all origins and allow standard headers
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// 2. Explicitly handle OPTIONS preflight requests globally before any routing
app.options("*", cors());

app.use(express.json());

// A simple root health-check route so Render's load balancer knows the app is alive
app.get("/", (req, res) => {
    res.status(200).json({ status: "healthy", message: "Backend is running!" });
});

app.use("/", feedRoutes);

module.exports = app;