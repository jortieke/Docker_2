
var express = require("express");
var router = express.Router();

var faleConoscoController = require("../controllers/faleConoscoController");

router.post("/mensagem", function (req, res) {
    faleConoscoController.enviarMensagem(req, res);
})


module.exports = router;