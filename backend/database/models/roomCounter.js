const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const roomCounterSchema = new Schema({

	count: Number,

}, {
	collection: 'roomCounter'
  })


const RoomCounter = mongoose.model('RoomCounter', roomCounterSchema)
module.exports = RoomCounter