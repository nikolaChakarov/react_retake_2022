const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const { createError } = require("../utils/createError");
var validator = require("validator");

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // check if user's email already exists;
        let user = await User.findOne({ email });

        if (user) {
            throw new Error(createError(500, "email already taken"));
        }

        const hashed = await bcrypt.hash(password, Number(process.env.SALT));

        user = new User({ username, email, password: hashed });
        await user.save();

        if (!username) {
            throw new Error(createError(401, "invalide username"));
        }
        if (!email || !validator.isEmail(email)) {
            throw new Error(createError(401, "invalide email"));
        }
        if (!password || password.length < 3) {
            throw new Error(createError(401, "invalide password"));
        }

        res.status(200).json({ username, email });
    } catch (err) {
        next(err);
    }
};
