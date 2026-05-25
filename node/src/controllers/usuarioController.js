var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "Houve um erro ao realizar o login! Erro: " + erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function cadastrarUsuario(req, res) {
    var fk_empresa = req.body.empresaServer
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var funcao = req.body.funcaoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fk_empresa == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else if (funcao == undefined) {
        res.status(400).send("Sua função está undefined!");
    } else {
        usuarioModel.cadastrarUsuario(fk_empresa, nome, email, cpf, senha, funcao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletarUsuario(req, res) {
    var id = req.params.id
    
    usuarioModel.deletarUsuario(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao deletar usuario!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}


function exibirUsuarios(req, res) {
    var id = req.params.id
    
    usuarioModel.exibirUsuarios(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao exibir os usuarios!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}

function listarUsuarios(req, res) {
    var id = req.params.id
    
    usuarioModel.listarUsuarios(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao listar os servidores!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }) 
        );
}



module.exports = {
    autenticar,
    cadastrarUsuario,
    deletarUsuario,
    listarUsuarios,
    exibirUsuarios
}