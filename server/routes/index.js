const router = require("express").Router();
router.use("/characters/details", require("./allCharecters"));
router.use("/characters/category", require("./charactersbyCategory"));
router.use("/characters", require("./charactersbyName"));
module.exports = router;
