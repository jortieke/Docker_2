const path = require("path");

async function gerarRelatorio(req, res) {

    const {
        usuario,
        email,
        mac_address,
        servidor,
        id_empresa
    } = req.params;

    try {

        const resposta = await fetch(
            "http://horus-java:8080/api/relatorios/rede",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    usuario,
                    email,
                    mac_address,
                    servidor,
                    id_empresa,
                    tipoComponente: "rede"
                })
            }
        );

        if (!resposta.ok) {

            const erro = await resposta.text();

            return res.status(500).json({
                erro: erro
            });
        }

        const urlPdf = await resposta.text();

        return res.redirect(urlPdf);

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            erro: "Falha ao comunicar com o serviço Java"
        });
    }
}

module.exports = {
    gerarRelatorio
};