require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
