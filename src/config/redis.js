const redis = require("redis");

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();

        console.log("Redis Connected");
    } catch (error) {
        console.log(
            "Redis Connection Error:",
            error.message
        );
    }
};

module.exports = {
    redisClient,
    connectRedis,
};