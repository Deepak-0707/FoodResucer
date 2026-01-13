const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

class Booking {
  static collection() {
    return getDB().collection('bookings');
  }

  static async create(bookingData) {
    const booking = {
      ...bookingData,
      createdAt: new Date(),
      status: 'confirmed'
    };
    const result = await this.collection().insertOne(booking);
    return { _id: result.insertedId, ...booking };
  }

  static async findByEventId(eventId) {
    return await this.collection()
      .find({ eventId: new ObjectId(eventId) })
      .toArray();
  }

  static async findAll() {
    return await this.collection().find({}).toArray();
  }
}

module.exports = Booking;