var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/capturarDados/:id_empresa/:mac_address", function (req, res) {
    processosController.capturarDados(req, res);
});

module.exports = router;