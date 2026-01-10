const express = require('express');
const jwt = require('jsonwebtoken');
const EventHost = require('../models/EventHost');
const auth = require('../middleware/auth');

const router = express.Router();

// Register Event Host - WITH DEBUG LOGGING
router.post('/register', async (req, res) => {
  try {
    console.log('=== EVENT HOST REGISTRATION REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { companyName, email, password, contactPerson, phone, businessType, website, address, description } = req.body;

    // Validate required fields
    if (!companyName || !email || !password || !contactPerson || !phone || !businessType) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['companyName', 'email', 'password', 'contactPerson', 'phone', 'businessType']
      });
    }

    console.log('✅ All required fields present');

    // Check if host exists
    console.log('Checking if host exists with email:', email);
    const existingHost = await EventHost.findOne({ email });
    if (existingHost) {
      console.log('❌ Event host already exists');
      return res.status(400).json({ message: 'Event host already registered with this email' });
    }
    console.log('✅ Email is unique');

    // Create new event host
    console.log('Creating new event host...');
    const eventHost = new EventHost({
      companyName,
      email,
      password,
      contactPerson,
      phone,
      businessType,
      website: website || '',
      address: address || '',
      description: description || ''
    });

    console.log('Saving event host to database...');
    await eventHost.save();
    console.log('✅ Event host saved successfully, ID:', eventHost._id);

    // Generate token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { id: eventHost._id, type: 'eventHost', email: eventHost.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ Token generated');

    console.log('=== REGISTRATION SUCCESSFUL ===');
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
    console.error('=== REGISTRATION ERROR ===');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error:', err);
    
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: err.message,
      errorType: err.name
    });
  }
});

// Login Event Host
router.post('/login', async (req, res) => {
  try {
    console.log('=== EVENT HOST LOGIN REQUEST ===');
    console.log('Email:', req.body.email);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const eventHost = await EventHost.findOne({ email });
    if (!eventHost) {
      console.log('❌ Event host not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Event host found, checking password...');
    const isMatch = await eventHost.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Password incorrect');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Password correct, generating token...');
    const token = jwt.sign(
      { id: eventHost._id, type: 'eventHost', email: eventHost.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('=== LOGIN SUCCESSFUL ===');
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
    console.error('=== LOGIN ERROR ===');
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Event Host profile
router.get('/profile', auth, async (req, res) => {
  try {
    const eventHost = await EventHost.findById(req.user.id).select('-password');
    if (!eventHost) {
      return res.status(404).json({ message: 'Event host not found' });
    }
    res.json(eventHost);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
