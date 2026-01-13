const Booking = require('../models/Booking');
const { sendBookingConfirmationEmail } = require('../utils/emailService');
const { ObjectId } = require('mongodb');

exports.createBooking = async (req, res) => {
  try {
    const { eventId, name, email, phone, eventType, foodsOrdered, expectedLeftover } = req.body;
    
    // Validate required fields
    if (!eventId || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Create booking
    const bookingData = {
      eventId: new ObjectId(eventId),
      name,
      email,
      phone,
      eventType,
      foodsOrdered,
      expectedLeftover
    };
    
    const booking = await Booking.create(bookingData);
    
    // Send confirmation email
    try {
      await sendBookingConfirmationEmail({
        to: email,
        name,
        eventType,
        foodsOrdered,
        expectedLeftover
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};
