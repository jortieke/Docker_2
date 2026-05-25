const jiraService = require("../services/jiraService");

async function filtrarDashboard(req, res) {
    try {
        var fkEmpresa = req.params.fkEmpresa;
        var fkFuncionario = req.params.fkFuncionario;

        const dados = await jiraService.filtrarDashboard(fkFuncionario, fkEmpresa);

        res.status(200).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao buscar issues"
        });

    }
}

async function chamadosPorComponente(req, res) {

    try {

        const {fkFuncionario,fkEmpresa,hostname} = req.params;

        const dados = await jiraService.chamadosPorComponente(fkFuncionario, fkEmpresa, hostname);

        res.json(dados);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });

    }
}

module.exports = {
    filtrarDashboard,
    chamadosPorComponente
};