const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
});

async function buscarJsonS3(){
/* async function buscarJsonS3(empresa, mac_adress,  periodo){
        const key = `client/${empresa}/${mac_adress}/${servidor}_${periodo}.json`;*/
    const key = `client/empresa_1/c0:35:32:c7:0b:59/dashboard.json`;

    const command = new GetObjectCommand({
        Bucket: "horus-monitoring",
        Key: key
    });

    const response = await s3.send(command);

    const jsonString = await response.Body.transformToString();

    return JSON.parse(jsonString);
}

module.exports = {
    buscarJsonS3
}