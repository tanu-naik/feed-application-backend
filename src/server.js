require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const {
    connectRedis,
} = require("./config/redis");

const initSocket = require("./socket/socket");

const {
    setSocketIO,
} = require("./controllers/feedController");

// Render automatically passes its own port here
const PORT = process.env.PORT || 8800;

const startServer = async () => {
    try {
        console.log("Creating HTTP Server...");
        const server = http.createServer(app);

        console.log("Initializing Socket.IO...");
        const io = initSocket(server);

        setSocketIO(io);

        // STEP 1: Bind to the port IMMEDIATELY so Render marks the deployment as 'Live'
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server safely running on port ${PORT}`);
        });

        // STEP 2: Connect to your databases asynchronously without blocking the server
        console.log("Connecting to remote databases in the background...");

        connectDB()
            .then(() => console.log("✅ MongoDB Connected Successfully"))
            .catch((err) => console.error("❌ MongoDB Connection Error:", err));

        connectRedis()
            .then(() => console.log("✅ Redis Connected Successfully"))
            .catch((err) => console.error("❌ Redis Connection Error:", err));

    } catch (error) {
        console.log("CRITICAL SERVER ERROR:", error);
    }
};

startServer();