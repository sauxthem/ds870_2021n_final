const Login = require("../models/Login");
const jwt = require("jsonwebtoken");

async function verifyJWT(req, res, next) {
	const token = req.headers["token"];
	if (!token) return res.status(401).json({msg: "Undefined token."});

	const tokendb = await Login.findOne({
		where: {token}
	});
	if (!tokendb) return res.status(401).json({msg: "Undefined token."});

	if(new Date() > tokendb.expiration	) {
		return res.status(401).json({msg: "Token expired."});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err)
			return res.status(401).json({msg: "Token authentication failed."});
		req.id = decoded.id;
		next();
	});
}

module.exports = verifyJWT;