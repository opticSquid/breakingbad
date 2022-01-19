const router = require("express").Router();
router.use("/characters",require("./allCharecters"));
module.exports = router;
