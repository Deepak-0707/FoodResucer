const express = require('express');
const jwt = require('jsonwebtoken');
const EventHost = require('../models/EventHost');
const auth = require('../middleware/auth');

const router = express.Router();

// Register Event Host
router.post('/register', async (req, res) => {
  try {
    const { companyName, email, password, contactPerson, phone, businessType, website, address, description } = req.body;

    const existingHost = await EventHost.findOne({ email });
    if (existingHost) {
      return res.status(400).json({ message: 'Event host already registered with this email' });
    }

    const eventHost = new EventHost({
      companyName,
      email,
      password,
      contactPerson,
      phone,
      businessType,
      website,
      address,
      description
    });

    await eventHost.save();

    const token = jwt.sign(
      { id: eventHost._id, type: 'eventHost', email: eventHost.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Event host registered successfully',
      token,
      eventHost: {
        id: eventHost._id,
        companyName: eventHost.companyName,
        email: eventHost.email,
        type: 'eventHost'
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login Event Host
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const eventHost = await EventHost.findOne({ email });
    if (!eventHost) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await eventHost.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: eventHost._id, type: 'eventHost', email: eventHost.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      eventHost: {
        id: eventHost._id,
        companyName: eventHost.companyName,
        email: eventHost.email,
        type: 'eventHost'
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Event Host profile
router.get('/profile', auth, async (req, res) => {
  try {
    const eventHost = await EventHost.findById(req.user.id).select('-password');
    res.json(eventHost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;