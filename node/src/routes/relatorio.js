var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController")

router.get("/:usuario/:email/:mac_address/:servidor/:id_empresa", function(req, res){
    relatorioController.gerarRelatorio(req,res)
});


module.exports = router;