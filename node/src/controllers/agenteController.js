const s3Service =
    require("../services/s3Service.js");

async function download(req, res) {

    try {

        const url =
            await s3Service.gerarUrlDownload();

        res.json({ url });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao gerar download"
        });
    }
}

module.exports = {
    download
};