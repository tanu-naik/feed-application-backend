const Joi = require("joi");



// Create Feed Validation Schema
const createFeedSchema = Joi.object({
    title: Joi.string()
        .trim()
        .max(100)
        .required(),

    message: Joi.string()
        .trim()
        .max(500)
        .required(),

    coachName: Joi.string()
        .trim()
        .optional(),

    category: Joi.string()
        .valid(
            "motivation",
            "fitness",
            "mindset",
            "nutrition"
        )
        .optional(),

    priority: Joi.string()
        .valid(
            "low",
            "medium",
            "high"
        )
        .optional(),
});



// Validator Function
const validateCreateFeed = (data) => {
    const { error } = createFeedSchema.validate(data);

    if (error) {
        return error.details[0].message;
    }

    return null;
};

module.exports = {
    validateCreateFeed,
};