const socketIO = require("socket.io");

const initSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    });

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        socket.on("disconnect", (reason) => {
            console.log("Socket Disconnected:", socket.id);
            console.log("Reason:", reason);
        });
    });

    return io;
};

module.exports = initSocket;