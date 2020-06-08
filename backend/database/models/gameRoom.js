const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const roomSchema = new Schema({

	room_name: { type: String, unique: false, required: false },
	room_id: { type: Number, unique: false, required: false },
	created_by: { type: String, unique: false, required: false },
	num_of_players: { type: String, unique: false, required: false },
	timestamp: { type: String, unique: false, required: false },
	joinees: {type: Array, unique: false, required: false },
})

// Define schema methods
roomSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}


const Room = mongoose.model('rooms', roomSchema)
module.exports = Room