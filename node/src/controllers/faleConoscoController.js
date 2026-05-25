var faleConoscoModel = require("../models/faleConoscoModel");


function enviarMensagem(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var mensagem = req.body.mensagemServer;
    console.log("Chegou aqui? controller fale conosco");


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (mensagem == undefined) {
        res.status(400).send("Sua mensagem está undefined!");
    }else {

        faleConoscoModel.enviarMensagem(nome, sobrenome, email, mensagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao enviar a mensagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    enviarMensagem
}