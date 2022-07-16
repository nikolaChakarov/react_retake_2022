const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const { createError } = require("../utils/createError");
var validator = require("validator");

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username) {
            throw new Error(createError(401, "invalide username"));
        }
        if (!email || !validator.isEmail(email)) {
            throw new Error(createError(401, "invalide email"));
        }
        if (!password || password.length < 3) {
            throw new Error(createError(401, "invalide password"));
        }

        // check if user's email already exists;
        let user = await User.findOne({ email });

        if (user) {
            throw new Error(createError(500, "email already taken"));
        }

        const hashed = await bcrypt.hash(password, Number(process.env.SALT));

        user = new User({ username, email, password: hashed });
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET,
            { expiresIn: 24 * 60 * 60 }
        );

        res.cookie("x-auth-token", token, { httpOnly: true })
            .status(200)
            .json({
                success: true,
                user: { username: user.username, email: user.email },
            });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !validator.isEmail(email)) {
            throw createError(401, "invalide email");
        }
        if (!password || password.length < 3) {
            throw createError(401, "invalide password");
        }

        // check if user exists;
        let user = await User.findOne({ email });

        if (!user) {
            throw createError(400, "invalid credentials");
        }

        // check if password is ok
        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (!isPasswordOk) {
            throw createError(400, "invalid credentials");
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET,
            { expiresIn: 24 * 60 * 60 }
        );

        res.cookie("x-auth-token", token, { httpOnly: true })
            .status(200)
            .json({
                success: true,
                user: { username: user.username, email: user.email },
            });
    } catch (err) {
        next(err);
    }
};
