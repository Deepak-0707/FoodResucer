const express = require('express');
const router = express.Router();
const { getUpcomingEvents, getEventById } = require('../controllers/eventController');

router.get('/', getUpcomingEvents);
router.get('/:id', getEventById);

module.exports = router;