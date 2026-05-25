
var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.delete("/deletarUsuario/:id", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});


router.get("/exibirUsuarios/:id", function (req, res) {
    usuarioController.exibirUsuarios(req, res);
})



module.exports = router;