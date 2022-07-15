const router = require("express").Router();

router.use("/api/users", require("./routes/users"));

module.exports = router;
