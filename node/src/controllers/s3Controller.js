const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function buscarDadosS3(req, res) {
    const empresa = req.params.empresa;
    console.log("Empresa recebida:", empresa);

    try {

        const command = new GetObjectCommand({

            Bucket: process.env.AWS_BUCKET,

            Key:
                `client/gestor/empresa_${empresa}/dashboard_gestor.json`
        });

        const data = await s3.send(command);

        const jsonString =
            await data.Body.transformToString();

        const json = JSON.parse(jsonString);

        res.json(json);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro ao buscar dados do S3"
        });
    }
}

module.exports = {
    buscarDadosS3
}