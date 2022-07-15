const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const router = require("../router");
const handleError = require("../middlewares/handleError");

const configExpress = (app) => {
    app.use(
        cors({
            origin: "http://localhost:3000",
            optionsSuccessStatus: 200, // some legacy browsers
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(router);
    app.use(handleError);
};

module.exports = configExpress;
