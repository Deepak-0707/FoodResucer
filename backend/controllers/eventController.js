const { getDB } = require('../config/db');

// Get events happening in the next 2 days
exports.getUpcomingEvents = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection('events');
    
    // Get current date and date 2 days from now
    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);
    
    // Query events within the next 2 days
    const events = await eventsCollection
      .find({
        createdAt: {
          $gte: today,
          $lte: twoDaysLater
        }
      })
      .sort({ createdAt: 1 })
      .toArray();
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message
    });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection('events');
    const { ObjectId } = require('mongodb');
    
    const event = await eventsCollection.findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message
    });
  }
};