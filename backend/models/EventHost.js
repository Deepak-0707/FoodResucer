const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const eventHostSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  contactPerson: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    required: true
  },
  website: String,
  address: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

eventHostSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

eventHostSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('EventHost', eventHostSchema);