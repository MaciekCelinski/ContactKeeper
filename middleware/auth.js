// middleware that allows us to send a token in a header
// to get to access the protective routes like contacts
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	// get token from header
	const token = req.header("x-auth-token");

	// check if token does not exist
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}

	try {
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		// payload: {"user" : { "id" : "id number" }, "iat": 123131, "exp": 23123213}

		// so at login we create a token
		// then in auth we verify it and
		// if everything is ok we
		// take user id and we put it into a req.user
		// to get access to the user.id in the route

		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
