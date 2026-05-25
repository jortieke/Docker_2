var ambiente_processo = 'producao';
//var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({
    path: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
    override: true
});

const express = require("express");
const cors = require("cors");
const path = require("path");

const encodingMiddleware = require("./src/middlewares/encodingMiddleware");

const app = express();


app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(encodingMiddleware);

app.use(express.static(path.join(__dirname, "public")));

// routes
const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const perfilRouter = require("./src/routes/perfil");
const servidoresRouter = require("./src/routes/servidores");
const temperaturaRouter = require("./src/routes/temperatura");
const processosRouter = require("./src/routes/processos");
const redeRouter = require("./src/routes/rede");
const relatorioRouter = require("./src/routes/relatorio");
const faleConoscoRouter = require("./src/routes/faleConosco");
const agenteRouter = require("./src/routes/agente");
const s3Router = require("./src/routes/s3");
const jiraRouter = require("./src/routes/jira");
const incidentesRouter = require("./src/routes/incidentes");

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/perfil", perfilRouter);
app.use("/faleConosco", faleConoscoRouter);
app.use("/servidores", servidoresRouter);
app.use("/temperatura", temperaturaRouter);
app.use("/processos", processosRouter);
app.use("/rede", redeRouter);
app.use("/relatorio", relatorioRouter);
app.use("/jira", jiraRouter);
app.use("/incidentes", incidentesRouter);
app.use("/s3", s3Router);
app.use("/agente", agenteRouter);

const PORTA_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
