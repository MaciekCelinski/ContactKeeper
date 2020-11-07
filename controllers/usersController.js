// import model
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// validator
const { validationResult } = require("express-validator");

// GET

const getUsers = async (req, res) => {
	try {
		let users = await User.find();

		res.send(users);
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ msg: "Server error" });
	}
};

// POST USERS

const postUser = async (req, res) => {
	// we create errors for express-validator
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			res.status(400).json({ msg: "User already exists" });
		}

		user = new User({ name, email, password });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();
		// payload will be added to the token and we will be able to get it from the token
		const payload = {
			user: {
				id: user.id,
			},
		};

		// creating a token to automatically log in

		jwt.sign(
			payload,
			config.get("jwtSecret"),
			{
				expiresIn: 360000,
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ msg: "Server error" });
	}
};

module.exports = { getUsers, postUser };
