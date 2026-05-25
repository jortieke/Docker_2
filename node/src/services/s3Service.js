const {
    S3Client,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const {
    getSignedUrl
} = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});
async function gerarUrlDownload() {

    const command =
        new GetObjectCommand({

            Bucket:
                process.env.AWS_BUCKET,

            Key:
                "agents/horus_agent.py"
        });

    const url =
        await getSignedUrl(
            s3,
            command,
            {
                expiresIn: 300
            }
        );

    return url;
}

module.exports = {
    gerarUrlDownload
};