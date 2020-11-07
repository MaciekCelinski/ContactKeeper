const express = require("express");

// import controllers
const { verifyLogin, verifyUserId } = require("../controllers/authController");

// validator
const { check } = require("express-validator");

// import auth middleware
const auth = require("../middleware/auth");

// init router
const router = express.Router();

// MANAGE ROUTES

// @route   GET api/auth
// @desc    Get logged in user
// @public  Private

router.get("/", auth, verifyUserId);

// @route   POST api/auth
// @desc    Auth user & get token
// @public  Private

router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	verifyLogin
);

module.exports = router;
