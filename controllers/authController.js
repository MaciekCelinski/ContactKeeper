// import model
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// validator
const { validationResult } = require("express-validator");

// MANAGE ROUTES

// POST

// login user
const verifyLogin = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// getting variables from the req.body
	const { email, password } = req.body;

	try {
		// getting user with all the variables
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ msg: "Invalid Credentails" });
		}

		// password is from req.body || user.password is from the user
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid Credentails" });
		}

		//  if password from input and one from database match we are
		// adding user.id to the payload to put it inside a token

		const payload = {
			user: {
				id: user.id,
			},
		};

        // creating (returning) a token

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
		res.status(500).send("Server error");
	}
};

const verifyUserId = async (req, res) => {
	// thanks to auth middleware we now have a "user.id" inside "req"

	try {
		// in 'user' we don't want to get password ... even if it is encrypted
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

module.exports = { verifyLogin, verifyUserId };
