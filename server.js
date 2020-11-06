const express = require("express");
const connectDB = require('./config/db')

// routes
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const contactsRoutes = require("./routes/contacts");

// connect database
connectDB()

// init app
const app = express();

// manage routes
app.get("/", (req, res) => {
	return res.json({ msg: "Welcome to the Contact Keeper API" });
});

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);

//  PORT
const PORT = process.env.PORT || 5000;

// connect server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
