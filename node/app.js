//var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({path: caminho_env, override: true});

var AWS = require("@aws-sdk/client-s3");

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
var perfilRouter = require("./src/routes/perfil");
var servidoresRouter = require("./src/routes/servidores");
const temperaturaRouter = require("./src/routes/temperatura");

var processosRouter = require("./src/routes/processos");

var redeRouter = require("./src/routes/rede");
var relatorioRouter = require("./src/routes/relatorio")
var faleConoscoRouter = require("./src/routes/faleConosco");
var agenteRouter = require("./src/routes/agente");
var s3Router = require("./src/routes/s3");

var jiraRouter = require("./src/routes/jira");
var incidentesRouter = require("./src/routes/incidentes");


app.use("/agente", agenteRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

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
