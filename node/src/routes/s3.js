var express = require("express");
var router = express.Router();

var s3Controller = require("../controllers/s3Controller");

router.get("/buscarDadosS3/:empresa", function(req, res) {
    s3Controller.buscarDadosS3(req, res);
});

module.exports = router;