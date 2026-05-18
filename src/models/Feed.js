const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        coachName: {
            type: String,
            default: "Admin",
        },

        category: {
            type: String,
            enum: ["motivation", "fitness", "mindset", "nutrition"],
            default: "motivation",
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Feed", feedSchema);