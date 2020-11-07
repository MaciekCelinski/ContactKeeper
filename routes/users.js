const express = require("express");

// controllers
const { getUsers, postUser } = require("../controllers/usersController");

// import User model
const User = require("../models/User");

// import express validator
const { check } = require("express-validator");

// init router
const router = express.Router();

// MANAGE ROUTES

// @route   GET api/users
// @desc    Get all users
// @public  Public

router.get("/", getUsers);

// @route   POST api/users
// @desc    post a user
// @public  Public

router.post(
	"/",
	[
		check("name", "Please insert name").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a valid password (min 6 characters)"
		).isLength({ min: 6 }),
	],
	postUser
);

module.exports = router;
