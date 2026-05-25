const {
    S3Client,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({

    region: process.env.AWS_REGION,

    credentials: {

        accessKeyId:
            process.env.AWS_ACCESS_KEY_ID,

        secretAccessKey:
            process.env.AWS_SECRET_ACCESS_KEY,

        sessionToken:
            process.env.AWS_SESSION_TOKEN
    }
});

async function buscarJsonS3(
    empresa,
    mac,
    periodo
) {

    try {

        console.log("EMPRESA:", empresa);
        console.log("MAC:", mac);
        console.log("PERIODO:", periodo);
        console.log("BUCKET:", process.env.AWS_BUCKET);

        const key =
            `client/empresa_${empresa}/${mac}/client_metrics.json`;

        console.log("KEY:", key);

        const command =
            new GetObjectCommand({

                Bucket: process.env.AWS_BUCKET,

                Key: key
            });

        const response =
            await s3.send(command);

        const jsonString =
            await response.Body.transformToString();

        console.log("JSON BRUTO:");
        console.log(jsonString.substring(0, 500));

        const jsonTratado =
            jsonString.replace(/:\s*NaN/g, ": null");

        return JSON.parse(jsonTratado);

    } catch (erro) {

        console.log("ERRO COMPLETO:");
        console.log(erro);

        throw erro;
    }
}

module.exports = {
    buscarJsonS3
};