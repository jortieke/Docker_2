const temperaturaModel =
    require("../models/temperaturaModel");

async function buscarDadosTemperatura(
    req,
    res
) {

    try {

        const empresa =
            req.params.empresa;

        const mac =
            req.params.mac;

        const periodo =
            req.params.periodo;

        const dados =
            await temperaturaModel
                .buscarJsonS3(
                    empresa,
                    mac,
                    periodo
                );

        res.json(dados);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });
    }
}

module.exports = {
    buscarDadosTemperatura
};