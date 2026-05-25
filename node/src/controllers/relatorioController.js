const axios = require("axios");

async function gerarRelatorio(req, res) {
    try {
        const { usuario, email, mac_address, servidor, id_empresa } = req.body;

        const response = await axios.post(
            "http://horus-java:8080/relatorio",
            {
                usuario,
                email,
                mac_address,
                servidor,
                id_empresa,
                tipoComponente: "REDE"
            },
            { timeout: 60000 }
        );

        return res.json({ url: response.data });

    } catch (err) {
        return res.status(500).json({
            erro: "Falha ao gerar relatório",
            detalhe: err.response?.data || err.message
        });
    }
}

module.exports = { gerarRelatorio };