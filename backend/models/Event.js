const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    expectedGuests: {
        type: Number,
        required: true
    },
    foodsOrdered: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);