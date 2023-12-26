const studentRouter = require("../routes/studentRoute");
const router = require("express").Router();
router.use("/student",studentRouter);

module.exports = router;