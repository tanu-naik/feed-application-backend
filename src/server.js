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

const PORT = process.env.PORT || 8800;

const startServer = async () => {
    try {
        console.log("Connecting MongoDB...");
        await connectDB();

        console.log("Connecting Redis...");
        await connectRedis();

        console.log("Creating HTTP Server...");
        const server = http.createServer(app);

        console.log("Initializing Socket.IO...");
        const io = initSocket(server);

        setSocketIO(io);

      server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("SERVER ERROR:", error);
    }
};

startServer();