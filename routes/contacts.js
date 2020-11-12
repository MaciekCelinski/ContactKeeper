const express = require("express");

// controllers
const {
	getContacts,
	postContact,
	updateContact,
	deleteContact
} = require("../controllers/contactsController");

// import middleware
const auth = require("../middleware/auth");

// import express validator
const { check } = require("express-validator");

// init router
const router = express.Router();

// MANAGE ROUTES

// @route   GET api/contacts
// @desc    Get all user contacts
// @public  Private

router.get("/", auth, getContacts);

// @route   POST api/contacts
// @desc    Add new contacts
// @public  Private

router.post(
	"/",
	[auth, [check("name", "Name is required").not().isEmpty()]],
	postContact
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @public  Private

router.put("/:id", auth, updateContact);

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @public  Private

router.delete("/:id", auth, deleteContact);

module.exports = router;
