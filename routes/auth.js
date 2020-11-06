const express = require("express");

// init router
const router = express.Router();

// MANAGE ROUTES

// @route   GET api/auth
// @desc    Get logged in user
// @public  Private

router.get("/", (req, res) => {
	res.send("Get logged in user");
});

// @route   POST api/auth
// @desc    Auth user & get token
// @public  Private

router.post("/", (req, res) => {
	res.send("Log in user");
});

module.exports = router;
