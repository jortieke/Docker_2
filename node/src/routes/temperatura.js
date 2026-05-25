const express =
    require("express");

const router =
    express.Router();

const temperaturaController =
    require("../controllers/temperaturaController");

router.get(
    "/:empresa/:mac/:periodo",
    temperaturaController.buscarDadosTemperatura
);

module.exports = router;