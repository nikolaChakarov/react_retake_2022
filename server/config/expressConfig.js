const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("../router");
const handleError = require("../middlewares/handleError");

const configExpress = (app) => {
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );
    app.use(cookieParser());

    app.use(express.json());

    app.use(router);

    app.use(handleError);
};

module.exports = configExpress;
