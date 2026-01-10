const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { sendConfirmationEmail } = require('../utils/emailService');


router.post('/', async (req, res) => {
    try {
        
        const event = new Event(req.body);
        await event.save();

        
        await sendConfirmationEmail(event);

        res.status(201).json({
            success: true,
            message: 'Event booked successfully',
            data: event
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to book event',
            error: error.message
        });
    }
});


router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ submittedAt: -1 });
        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
            error: error.message
        });
    }
});

module.exports = router;