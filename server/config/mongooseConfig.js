const mongoose = require("mongoose");

const mongoogeConfig = () => {
    return mongoose
        .connect(process.env.MONGO_URL)
        .then((data) => {
            console.log("DB connected");
        })
        .catch((err) => console.log(err));
};

module.exports = mongoogeConfig;
