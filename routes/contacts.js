const express = require("express");

// init router
const router = express.Router();

// MANAGE ROUTES

// @route   GET api/contacts
// @desc    Get all user contacts
// @public  Private

router.get("/", (req, res) => {
	res.send("Get all contacts");
});

// @route   POST api/contacts
// @desc    Add new contacts
// @public  Private

router.post("/", (req, res) => {
	res.send("Add new contact");
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @public  Private

router.put("/:id", (req, res) => {
	res.send("Update contact");
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @public  Private

router.delete("/:id", (req, res) => {
	res.send("Delete contact");
});

module.exports = router;