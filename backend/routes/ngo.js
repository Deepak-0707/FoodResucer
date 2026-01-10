const express = require('express');
const jwt = require('jsonwebtoken');
const NGO = require('../models/NGO');
const auth = require('../middleware/auth');

const router = express.Router();

// Register NGO
router.post('/register', async (req, res) => {
  try {
    const { organizationName, email, password, registrationNumber, contactPerson, phone, address, description } = req.body;

    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({ message: 'NGO already registered with this email' });
    }

    const ngo = new NGO({
      organizationName,
      email,
      password,
      registrationNumber,
      contactPerson,
      phone,
      address,
      description
    });

    await ngo.save();

    const token = jwt.sign(
      { id: ngo._id, type: 'ngo', email: ngo.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

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
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login NGO
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await ngo.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: ngo._id, type: 'ngo', email: ngo.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

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
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get NGO profile
router.get('/profile', auth, async (req, res) => {
  try {
    const ngo = await NGO.findById(req.user.id).select('-password');
    res.json(ngo);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;