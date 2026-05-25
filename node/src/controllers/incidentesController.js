const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});


async function calcularIndice(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    const macAddress = req.params.macAddress;
    
    try {

        const command = new GetObjectCommand({

            Bucket: process.env.AWS_BUCKET,

            // client -> id da empresa -> mac address -> calcularIndice.json 
            Key:
                `client/empresa_${fkEmpresa}/${macAddress}/calcularIndice.json`
        });


        // aguardando resposta da requisição
        const data = await s3.send(command);


        const jsonString = await data.Body.transformToString();

        // Remoção de acentos
        const jsonStringTratado = jsonString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // Parse the sanitized string into a JSON object
        const json = JSON.parse(jsonStringTratado);

    } catch (erro) {

        console.error("ERRO AWS:", erro);

        res.status(500).json({
            erro: "Erro ao buscar indice"
        });
    }
}

module.exports = {
    calcularIndice
};