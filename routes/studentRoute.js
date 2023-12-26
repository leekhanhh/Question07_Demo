const {save} = require("../controllers/studentController");
const router = require("express").Router();
router.post("/create",save);


module.exports = router;