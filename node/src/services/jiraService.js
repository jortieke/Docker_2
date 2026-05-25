const axios = require("axios");

var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const JIRA_DOMINIO = process.env.JIRA_DOMINIO;

const servidorModel = require("../models/servidoresModel")

async function buscarIssues(fkFuncionario, fkEmpresa) {
    try {
        const response = await axios.get(
            `https://${JIRA_DOMINIO}.atlassian.net/rest/api/3/search/jql`,
            {
                params: {
                    jql: "project = KAN AND created >= -7d",
                    fields: [
                        "summary",
                        "status",
                        "priority",
                        "created",
                        "resolutiondate",
                        "issuetype",
                        "labels"
                    ]
                },

                headers: {
                    Accept: "application/json"
                },

                auth: {
                    username: JIRA_EMAIL,
                    password: JIRA_TOKEN
                }
            }
        );

        const incidentes = response.data.issues.map(issue => {

            const labels = issue.fields.labels || [];

            const componentesValidos = [
                "cpu", "ram", "disco", "rede", "temperatura", "processos"
            ];

            const componente = labels.find(
                label => componentesValidos.includes(label)
            );

            const servidor = labels.find(
                label => !componentesValidos.includes(label)
            );

            return {

                id: issue.id,

                key: issue.key,

                titulo: issue.fields.summary,

                status: issue.fields.status.name,

                prioridade: issue.fields.priority.name,

                criadoEm: issue.fields.created,

                resolvidoEm: issue.fields.resolutiondate,

                componente: componente || "desconhecido",

                servidor: servidor || "desconhecido"

            };
        });

        const servidores = await servidorModel.listarServidoresComAcesso(fkEmpresa, fkFuncionario);


        const servidoresPermitidos = servidores.filter(s => s.tem_acesso == 1).map(s => s.hostname.toLowerCase());


        const incidentesFiltrados = incidentes.filter(incidente => servidoresPermitidos.includes(incidente.servidor.toLowerCase())
        );

        return incidentesFiltrados;
    } catch (erro) {
        console.log(
            "Erro Jira:",
            erro.response?.data || erro.message
        );

        throw erro;
    }
}

async function filtrarDashboard(fkFuncionario, fkEmpresa) {
    const incidentes = await buscarIssues(fkFuncionario, fkEmpresa);

    var ativos = incidentes.filter(
        i => i.resolvidoEm == null
    )

    var resolvidos = incidentes.filter(
        i => i.resolvidoEm != null
    )

    var criticos = incidentes.filter(
        i => i.prioridade == "Highest"
    )

    var altos = incidentes.filter(
        i => i.prioridade == "High"
    )

    var medios = incidentes.filter(
        i => i.prioridade == "Medium"
    )

    var baixos = incidentes.filter(
        i => i.prioridade == "Low"
    )

    return {
        incidentes: incidentes,
        incidentesAtivos: ativos.length,
        incidentesResolvidos: resolvidos.length,
        criticos: criticos.length,
        altos: altos.length,
        medios: medios.length,
        baixos: baixos.length
    }
}


async function chamadosPorComponente(fkFuncionario, fkEmpresa, hostname) {

    const incidentes = await buscarIssues(fkFuncionario, fkEmpresa);


    const incidentesServidor = incidentes.filter(
        incidente =>
            incidente.servidor.toLowerCase() === hostname.toLowerCase()
    );

    const componentes = {
        cpu: 0,
        ram: 0,
        disco: 0,
    };

    incidentesServidor.forEach(incidente => {

        const comp = incidente.componente?.toLowerCase();

        if (componentes.hasOwnProperty(comp)) {
            componentes[comp]++;
        }

    });

    return componentes;
}

module.exports = {
    buscarIssues,
    filtrarDashboard,
    chamadosPorComponente
};