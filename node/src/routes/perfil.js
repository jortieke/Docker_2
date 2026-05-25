var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
const perfilController = require('../controllers/perfilController');

router.put('/imagemPerfil', upload.single('fotoPerfil'), (req, res) => {
    perfilController.salvarImagemPerfil(req, res);
});

router.get('/imagemPerfil/:idUsuario', perfilController.buscarImagemPerfil);

router.get("/carregar", function (req, res) {
    perfilController.carregarUsuario(req, res);
})

router.put("/editar/:idUsuario", function (req, res) {
    perfilController.editar(req, res);
});

module.exports = router;