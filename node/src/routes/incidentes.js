const express = require("express");

const router = express.Router();

const incidentesController = require("../controllers/incidentesController");


router.get("/calcularIndice/:fkEmpresa/:macAddress", function (req, res) {
    incidentesController.calcularIndice(req, res);
});

module.exports = router;