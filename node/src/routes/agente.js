const express = require("express");

const router = express.Router();

const agenteController =
    require("../controllers/agenteController");

router.get("/download", function (req, res) {
    agenteController.download(req, res);
});

module.exports = router;