const router = require("express").Router();
const { getAllCats } = require("../controllers/catController");

router.get("/cats", getAllCats);

module.exports = router;
