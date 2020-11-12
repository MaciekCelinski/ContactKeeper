// import models
const User = require("../models/User");
const Contact = require("../models/Contact");

// validator
const { validationResult } = require("express-validator");

// MANAGE ROUTES

// GET

const getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		return res.json(contacts);
	} catch (err) {
		console.error(err.message).json({ msg: "Server Error" });
	}
};

// POST

const postContact = async (req, res) => {
	// validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, phone, type } = req.body;

	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id,
		});

		const contact = await newContact.save();

		return res.json(contact);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json("Server Error");
	}
};

// PUT

const updateContact = async (req, res) => {
	const { name, email, phone, type } = req.body;

	const contactFileds = {};

	if (name) contactFileds.name = name;
	if (email) contactFileds.email = email;
	if (phone) contactFileds.phone = phone;
	if (type) contactFileds.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{
				$set: contactFileds,
			},
			{ new: true }
		);

		return res.json(contact);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json("Server Error");
	}
};

const deleteContact = async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		const deletedContact = await Contact.findByIdAndRemove(req.params.id);

		res.send(deletedContact);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
};

module.exports = { getContacts, postContact, updateContact, deleteContact };
