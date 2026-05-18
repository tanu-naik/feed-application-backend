const Feed = require("../models/Feed");

const { redisClient } = require("../config/redis");

const {
    validateCreateFeed,
} = require("../validators/feedValidator");

let io;



// Set socket instance
const setSocketIO = (socketInstance) => {
    io = socketInstance;
};



// =============================
// GET /feed
// =============================
const getFeeds = async (req, res) => {
    try {
        // Check Redis cache
        const cachedFeeds = await redisClient.get("feeds");

        if (cachedFeeds) {
            console.log("Serving feeds from Redis");

            return res.status(200).json({
                success: true,
                source: "redis-cache",
                data: JSON.parse(cachedFeeds),
            });
        }

        // Fetch from MongoDB
        const feeds = await Feed.find({
            isActive: true,
        }).sort({
            createdAt: -1,
        });

        // Save in Redis cache
        await redisClient.set(
            "feeds",
            JSON.stringify(feeds),
            {
                EX: 60,
            }
        );

        console.log("Serving feeds from MongoDB");

        return res.status(200).json({
            success: true,
            source: "mongodb",
            data: feeds,
        });
    } catch (error) {
        console.log("GET FEED ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch feeds",
            error: error.message,
        });
    }
};



// =============================
// POST /feed
// =============================
const createFeed = async (req, res) => {
    try {
        const { title, message, coachName, category, priority } = req.body;

        const validationError = validateCreateFeed({ title, message, category, priority });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const newFeed = await Feed.create({ title, message, coachName, category, priority });

        await redisClient.del("feeds");

        io?.emit("newFeed", newFeed);

        return res.status(201).json({   // ← this was the bug
            success: true,
            message: "Feed created successfully",
            data: newFeed,
        });
    } catch (error) {
        console.log("CREATE FEED ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create feed",
            error: error.message,
        });
    }
};


module.exports = {
    getFeeds,
    createFeed,
    setSocketIO,
};