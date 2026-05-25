var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/buscarDadosRede/:id_empresa/:mac_address/:periodo", function(req, res){
    redeController.buscarDadosRede(req,res)
})

router.get("/buscarAlertas/:idEmpresa/:macAddress", function(req, res){
    redeController.buscarAlertas(req,res)
})

module.exports = router;