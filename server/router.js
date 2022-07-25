const router = require("express").Router();

router.use("/api/users", require("./routes/users"));
router.use("/api/cats", require("./routes/cats"));

module.exports = router;
