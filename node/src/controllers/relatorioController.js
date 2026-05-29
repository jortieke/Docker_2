const path = require("path");
const { spawn } = require("child_process");

async function gerarRelatorio(req, res) {

    const { usuario, email, mac_address, servidor, id_empresa } = req.params;

    const caminhoJar = process.env.JAR_PATH
        || path.resolve(__dirname, "../../JarExecutavel/target/JarExecutavel-1.0-SNAPSHOT-shaded.jar");

    let caminhoPDF = "";
    let erroOutput = "";

    

    const javaProcess = spawn("java", [
    "-Dfile.encoding=UTF-8",
    "-jar",
    caminhoJar,
    usuario,
    email,
    mac_address,
    servidor,
    id_empresa
    ], {
        env: process.env
    });


    javaProcess.stdout.on("data", (data) => {
        caminhoPDF += data.toString();
    });

    javaProcess.stderr.on("data", (data) => {
        erroOutput += data.toString();
    });

    javaProcess.on("close", (code) => {

        if (code !== 0) {
            console.error("Erro ao gerar relatório (código " + code + "):\n" + erroOutput);
            return res.status(500).json({
                erro: "Falha ao gerar o relatório.",
                detalhe: erroOutput
            });
        }

        caminhoPDF = caminhoPDF.trim();

        if (!caminhoPDF) {
            return res.status(500).json({
                erro: "O JAR não retornou o caminho do PDF."
            });
        }

        res.download(caminhoPDF, (err) => {
            if (err) {
                console.error("Erro ao enviar PDF:", err);
                if (!res.headersSent) {
                    res.status(500).json({ erro: "Erro ao fazer download do PDF." });
                }
            }
        });
    });

    javaProcess.on("error", (err) => {
        console.error("Não foi possível iniciar o processo Java:", err);
        res.status(500).json({ erro: "Java não encontrado ou JAR inválido." });
    });
}

module.exports = {
    gerarRelatorio
};