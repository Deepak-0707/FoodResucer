const express = require('express');
const jwt = require('jsonwebtoken');
const NGO = require('../models/NGO');
const auth = require('../middleware/auth');

const router = express.Router();

// Register NGO - WITH DEBUG LOGGING
router.post('/register', async (req, res) => {
  try {
    console.log('=== NGO REGISTRATION REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { organizationName, email, password, registrationNumber, contactPerson, phone, address, description } = req.body;

    // Validate required fields
    if (!organizationName || !email || !password || !registrationNumber || !contactPerson || !phone) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['organizationName', 'email', 'password', 'registrationNumber', 'contactPerson', 'phone']
      });
    }

    console.log('✅ All required fields present');

    // Check if NGO exists
    console.log('Checking if NGO exists with email:', email);
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      console.log('❌ NGO already exists');
      return res.status(400).json({ message: 'NGO already registered with this email' });
    }
    console.log('✅ Email is unique');

    // Check registration number
    console.log('Checking registration number:', registrationNumber);
    const existingReg = await NGO.findOne({ registrationNumber });
    if (existingReg) {
      console.log('❌ Registration number already exists');
      return res.status(400).json({ message: 'Registration number already exists' });
    }
    console.log('✅ Registration number is unique');

    // Create new NGO
    console.log('Creating new NGO...');
    const ngo = new NGO({
      organizationName,
      email,
      password,
      registrationNumber,
      contactPerson,
      phone,
      address: address || '',
      description: description || ''
    });

    console.log('Saving NGO to database...');
    await ngo.save();
    console.log('✅ NGO saved successfully, ID:', ngo._id);

    // Generate token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { id: ngo._id, type: 'ngo', email: ngo.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ Token generated');

    console.log('=== REGISTRATION SUCCESSFUL ===');
    res.status(201).json({
      message: 'NGO registered successfully',
      token,
      ngo: {
        id: ngo._id,
        organizationName: ngo.organizationName,
        email: ngo.email,
        type: 'ngo'
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

// Login NGO
router.post('/login', async (req, res) => {
  try {
    console.log('=== NGO LOGIN REQUEST ===');
    console.log('Email:', req.body.email);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      console.log('❌ NGO not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ NGO found, checking password...');
    const isMatch = await ngo.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Password incorrect');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Password correct, generating token...');
    const token = jwt.sign(
      { id: ngo._id, type: 'ngo', email: ngo.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('=== LOGIN SUCCESSFUL ===');
    res.json({
      message: 'Login successful',
      token,
      ngo: {
        id: ngo._id,
        organizationName: ngo.organizationName,
        email: ngo.email,
        type: 'ngo'
      }
    });
  } catch (err) {
    console.error('=== LOGIN ERROR ===');
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get NGO profile
router.get('/profile', auth, async (req, res) => {
  try {
    const ngo = await NGO.findById(req.user.id).select('-password');
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    res.json(ngo);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;