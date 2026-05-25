var servidoresModel = require("../models/servidoresModel");

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3")

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});


async function lerJson(key) {

    const command = new GetObjectCommand({

        Bucket: process.env.AWS_BUCKET,

        Key: key
    });

    const data = await s3.send(command);

    const jsonString = await data.Body.transformToString();

    return JSON.parse(jsonString);
}

async function capturarDados(req, res) {

    try {


        const { fkEmpresa, macAddress } = req.params;

        const [metricas] = await Promise.all([

            lerJson(

                `client/empresa_${fkEmpresa}/${macAddress}/metricas.json`   
            ),

        ]);

        res.set("Cache-Control", "no-store");
        res.json({ metricas });

        console.log(metricas);

        console.log(metricas);

        //console.log("KPIS:");
        //console.log(kpis);

        //console.log("PROCESSOS:");
        //console.log(processos);

    } catch (erro) {

        console.error(
            "ERRO AWS:",
            erro
        );

        res.status(500).json({
            erro:
                "Erro ao buscar dashboard"
        });
    }
}



// Servidores
function cadastrarServidor(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer
    var nome = req.body.nomeServer;
    var ip = req.body.ipServer;
    var localizacao = req.body.localizacaoServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var limiteCpu = req.body.limiteCpuServer;
    var unidadeMedidaCpu = req.body.unidadeMedidaCpuServer;
    var limiteRam = req.body.limiteRamServer;
    var unidadeMedidaRam = req.body.unidadeMedidaRamServer;
    var limiteDisco = req.body.limiteDiscoServer;
    var unidadeMedidaDisco = req.body.unidadeMedidaDiscoServer;

    console.log("Servidores Controller");

    if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("IP está undefined!");
    } else if (localizacao == undefined) {
        res.status(400).send("Localização está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("Sistema Operacional está undefined!");
    } else {

        servidoresModel.cadastrarServidor(nome, ip, localizacao, sistemaOperacional, fkEmpresa, limiteCpu, unidadeMedidaCpu, limiteRam, unidadeMedidaRam, limiteDisco, unidadeMedidaDisco)
            .then(
                (resultado => {
                    res.json(resultado);
                })
            ).catch(
                (erro => {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o servidor!\nErro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                })
            );
    }
}

function exibirServidores(req, res) {
    var fkEmpresa = req.params.fkEmpresa

    servidoresModel.exibirServidores(fkEmpresa)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao exibir os servidores!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
        );
}

function listarServidores(req, res) {

    var fkEmpresa = req.body.fkEmpresaServer;
    var servidores = req.body.servidoresServer;

    servidoresModel.listarServidores(fkEmpresa, servidores)

        .then((resultado) => {
            res.json(resultado);
        })

        .catch((erro) => {

            console.log(erro);

            console.log(
                "\nHouve um erro ao listar os servidores!\nErro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}

function deletarServidor(req, res) {
    var id = req.params.id

    servidoresModel.deletarServidor(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao deletar servidor!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
        );
}



// Componentes
function cadastrarComponente(req, res) {
    var fkServidor = req.body.fkServidorServer
    var fkComponente = req.body.fkComponenteServer;
    var unidadeMedida = req.body.unidadeMedidaServer;
    var componenteLimite = req.body.componenteLimiteServer;

    if (fkServidor == undefined) {
        res.status(400).send("fkServidor está undefined!");
    } else if (fkComponente == undefined) {
        res.status(400).send("fkComponente está undefined!");
    } else if (unidadeMedida == undefined) {
        res.status(400).send("Unidade medida está undefined!");
    } else if (componenteLimite == undefined) {
        res.status(400).send("Limite está undefined!");
    } else {

        servidoresModel.cadastrarComponente(fkServidor, fkComponente, unidadeMedida, componenteLimite)
            .then(
                (resultado => {
                    res.json(resultado);
                })
            ).catch(
                (erro => {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar o servidor!\nErro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                })
            );
    }
}

function abrirDetalhes(req, res) {
    var macAddress = req.params.macAddress;

    servidoresModel.abrirDetalhes(macAddress)
        .then((resultado) => {
            if (!resultado || resultado.length === 0) {
                return res.status(404).json({ erro: 'Servidor não encontrado' });
            }

            const primeiraLinha = resultado[0];

            res.json({
            hostname: primeiraLinha.hostname,
            endereco_ip: primeiraLinha.endereco_ip,
            fk_empresa: primeiraLinha.fk_empresa,
            localizacao: primeiraLinha.localizacao,
            status_servidor: primeiraLinha.status_servidor,
            mac_address: primeiraLinha.mac_address
        });
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletarComponente(req, res) {
    var id = req.params.id

    servidoresModel.deletarComponente(id)
        .then(
            (resultado => {
                res.json(resultado);
            })
        ).catch(
            (erro => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao deletar servidor!\nErro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
        );
}

function listarServidoresComAcesso(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    const fkFuncionario = req.params.fkFuncionario;

    servidoresModel.listarServidoresComAcesso(fkEmpresa, fkFuncionario)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}


function quantidadeAnalistasPorServidor(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    servidoresModel.quantidadeAnalistasPorServidor(fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao buscar quantidade de analistas!\nErro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarAcessos(req, res) {
    const { fkFuncionario, servidores } = req.body;

    servidoresModel.limparAcessos(fkFuncionario)
        .then(() => servidoresModel.inserirAcessos(fkFuncionario, servidores))
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json(err));
}


function listarAnalistasDisponiveis(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var hostname = req.params.hostname;

    servidoresModel.listarAnalistasDisponiveis(fkEmpresa, hostname)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar analistas disponíveis!\nErro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function reatribuirAnalista(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;
    var hostname = req.body.hostnameServer;
    var fkFuncionario = req.body.fkFuncionarioServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("Hostname está undefined!");
    } else if (fkFuncionario == undefined) {
        res.status(400).send("fkFuncionario está undefined!");
    } else {
        servidoresModel.reatribuirAnalista(fkEmpresa, hostname, fkFuncionario)
            .then(() => {
                res.sendStatus(200);
            })
            .catch((erro) => {
                console.log(erro);
                console.log(
                    "Houve um erro ao reatribuir analista!Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarServidor,
    exibirServidores,
    listarServidores,
    cadastrarComponente,
    abrirDetalhes,
    deletarServidor,
    deletarComponente,
    listarServidoresComAcesso,
    quantidadeAnalistasPorServidor,
    listarAnalistasDisponiveis,
    atualizarAcessos,
    reatribuirAnalista,
    lerJson,
    capturarDados
}