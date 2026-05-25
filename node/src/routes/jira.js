const express = require("express");

const router = express.Router();

const jiraController = require("../controllers/jiraController");


router.get("/dashboard/:fkEmpresa/:fkFuncionario", function (req, res) {
    jiraController.filtrarDashboard(req, res);
});


router.get("/chamadosComponente/:fkFuncionario/:fkEmpresa/:hostname", function (req, res){
    jiraController.chamadosPorComponente(req,res)
})

module.exports = router;