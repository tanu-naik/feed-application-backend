const express = require("express");

const {
    getFeeds,
    createFeed,
} = require("../controllers/feedController");

const router = express.Router();

router.get("/get-feeds", getFeeds);

router.post("/create-feed", createFeed);

module.exports = router;