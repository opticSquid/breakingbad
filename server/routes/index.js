const router = require("express").Router();
router.use("/characters/details", require("./allCharecters"));
router.use("/characters/category", require("./charactersbyCategory"));
router.use("/characters/id", require("./charactersbyId"));
router.use("/characters", require("./charactersbyName"));
router.use("/quotes", require("./quotesByCharacter"));
module.exports = router;
