const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
	// creating relation with user model by the specific collection in database 'users'
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: "Personal", // type will be 'Personal' or 'Professional'
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("contact", ContactSchema);
