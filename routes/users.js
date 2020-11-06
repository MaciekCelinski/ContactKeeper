const express = require("express");

// init router
const router = express.Router();

// MANAGE ROUTES

// @route   POST api/users
// @desc    register a user
// @public  Public

router.post("/", (req, res) => {
	res.send("Register a user");
});

module.exports = router;
