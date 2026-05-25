const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function buscarDadosRede(req, res) {

    try {

        const periodo = req.params.periodo;
        const mac_address = req.params.mac_address;
        const id_empresa = req.params.id_empresa;

        const command = new GetObjectCommand({

            Bucket: process.env.AWS_BUCKET,

            Key:
                `client/empresa_${id_empresa}/${mac_address}/dashboard_rede_${periodo}.json`
        });

        const data = await s3.send(command);

        const jsonString =
            await data.Body.transformToString();

        const json = JSON.parse(jsonString);

        res.json(json);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro ao buscar dashboard"
        });
    }
}

async function buscarAlertas(req, res) {

    const idEmpresa =
        req.params.idEmpresa;

    const macAddress =
        decodeURIComponent(
            req.params.macAddress
        );

    const key =
        `client/alertas/empresa_${idEmpresa}/${macAddress}/incidentes_rede_24h.json`;

    console.log("KEY:", key);

    try {

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: key
        });

        const data = await s3.send(command);

        const jsonString =
            await data.Body.transformToString();

        const json =
            JSON.parse(jsonString);

        res.status(200).json(json);

    } catch (erro) {

        console.error(erro);

        if (
            erro.name === "NoSuchKey" ||
            erro.Code === "NoSuchKey"
        ) {
            return res.status(200).json([]);
        }

        res.status(500).json({
            erro: "Erro ao buscar alertas"
        });
    }
}

module.exports = {
    buscarDadosRede,
    buscarAlertas
}