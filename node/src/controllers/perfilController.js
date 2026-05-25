const fs = require("fs");
const path = require("path");
var perfilModel = require("../models/perfilModel");

function salvarImagemPerfil(req, res) {
  var idUsuario = req.body.idUsuario;
  const novaImagem = req.file?.filename;
  
  if (!idUsuario || !novaImagem) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  perfilModel.buscarImagemPerfil(idUsuario)
    .then(resultado => {
      const imagemAntiga = resultado[0]?.imagem;

      if (imagemAntiga && imagemAntiga !== "usuario.png") {
        const caminhoImagem = path.join(__dirname, "../../public/assets/imgsBd", imagemAntiga);

        fs.unlink(caminhoImagem, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntiga);
          }
        });
      }

      return perfilModel.salvarImagemPerfil(idUsuario, novaImagem);
    })
    .then(resultado => {
      res.status(200).json({
        msg: "Imagem enviada com sucesso",
        imagem: novaImagem
      });
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  }

function buscarImagemPerfil(req, res) {
  const idUsuario = req.params.idUsuario;

  perfilModel.buscarImagemPerfil(idUsuario)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].imagem) {
        res.json({ imagem: resultado[0].imagem });
      } else {
        res.json({ imagem: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

function carregarUsuario(req, res) {
    const idUsuario = req.query.idUsuario

    if (!idUsuario) {
        return res.status(400).send("ID da usuario não enviado")
    }

    perfilModel.carregarUsuario(idUsuario)
        .then(resultado => 
            res.json(resultado)
        )
        .catch(erro => {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function editar(req, res) {

    const idFuncionario = req.params.idUsuario
    const dados = req.body

    perfilModel.editar(idFuncionario, dados)
        .then(resultado => {
            res.json(resultado)
        })
        .catch(erro => {
            console.log(erro)
            res.status(500).json(erro)
        })
}

module.exports = {
  salvarImagemPerfil,
  buscarImagemPerfil,
  carregarUsuario,
  editar
};