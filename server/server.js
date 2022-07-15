require("dotenv").config();
const express = require("express");
const app = express();

const expessConfig = require("./config/expressConfig");
expessConfig(app);

const mongooseConfig = require("./config/mongooseConfig");

const PORT = process.env.PORT || 5005;

// first we want to connect to DB...
mongooseConfig()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
