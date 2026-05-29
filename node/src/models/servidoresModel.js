var database = require("../database/config")

// Servidores
function cadastrarServidor(nome, ip, localizacao, sistemaOperacional, fkEmpresa, limiteCpu, unidadeMedidaCpu, limiteRam, unidadeMedidaRam, limiteDisco, unidadeMedidaDisco) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, ip, localizacao, sistemaOperacional, fkEmpresa, limiteCpu, unidadeMedidaCpu, limiteRam, unidadeMedidaRam, limiteDisco, unidadeMedidaDisco);

    var instrucaoSql = `
        INSERT INTO servidor (hostname, endereco_ip, localizacao, sistema_operacional, fk_empresa) 
        VALUES ('${nome}', '${ip}', '${localizacao}', '${sistemaOperacional}', '${fkEmpresa}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then((resultado) => {
            var idServidor = resultado.insertId;

            var componentesSql = `
            INSERT INTO servidor_componente (fk_servidor, fk_componente, unidade_medida, limite) VALUES
            ('${idServidor}', '1',  '${unidadeMedidaCpu}',  '${limiteCpu}'),
            ('${idServidor}', '2',  '${unidadeMedidaRam}',  '${limiteRam}'),
            ('${idServidor}', '3','${unidadeMedidaDisco}','${limiteDisco}');
        `;

            return database.executar(componentesSql)
        });
}

function exibirServidores(fkEmpresa) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucaoSql = `
        SELECT 
        servidor.id_servidor,
        servidor.hostname,
        servidor.localizacao,
        servidor.endereco_ip,
        servidor.sistema_operacional,
        servidor.status_servidor,
        COUNT(servidor_componente.fk_componente) AS quantidade 
        FROM servidor
        JOIN servidor_componente ON fk_servidor = id_servidor
        WHERE fk_empresa = ${fkEmpresa}
        GROUP BY 
        servidor.id_servidor,
        servidor.hostname,
        servidor.localizacao,
        servidor.endereco_ip,
        servidor.sistema_operacional,
        servidor.status_servidor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarServidores(fkEmpresa, servidores) {

    console.log("SERVIDORES:", servidores);

    const listaMacs = servidores
        .map(mac => `'${mac}'`)
        .join(",");

    var instrucaoSql = `
        SELECT
            id_servidor,
            hostname,
            mac_address,
            status_servidor
        FROM servidor
        WHERE fk_empresa = ${fkEmpresa}
            AND mac_address IN (${listaMacs});
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function deletarServidor(id) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);

    var deletarComponentes = `
        DELETE FROM servidor_componente WHERE fk_servidor = ${id};
    `;

    var deletarServidor = `
        DELETE FROM servidor WHERE id_servidor = ${id};
    `;

    var deletarAssociativa = `
        DELETE FROM acesso_servidor WHERE fk_servidor = ${id};
    `

    return database.executar(deletarComponentes)
        .then(() => {
            return database.executar(deletarAssociativa);
        })
        .then(() => {
            return database.executar(deletarServidor);
        });
}

// Componentes
function cadastrarComponente(fkServidor, fkComponente, unidadeMedida, componenteLimite) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkServidor, fkComponente, unidadeMedida, componenteLimite);

    var instrucaoSql = `
        INSERT INTO servidor_componente (fk_servidor, fk_componente, unidade_medida, limite) 
        VALUES ('${fkServidor}', '${fkComponente}', '${unidadeMedida}', '${componenteLimite}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function abrirDetalhes(macAddress) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", macAddress);

    var instrucaoSql = `
        SELECT *,
        componente.tipo AS tipo,
        servidor.hostname AS servidor
        FROM servidor_componente 
        JOIN componente ON fk_componente = id_componente
        JOIN servidor ON fk_servidor = id_servidor
        WHERE servidor.mac_address = '${macAddress}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarComponente(id) {
    console.log("ACESSEI O MODEL SERVIDORES \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);

    var instrucaoSql = `
        DELETE FROM servidor_componente WHERE id_servidor_componente = ${id};
    `;
    return database.executar(instrucaoSql)
}

function listarServidoresComAcesso(fkEmpresa, fkFuncionario) {
    const instrucaoSql = `
        SELECT 
            s.id_servidor,
            s.hostname,
            s.status_servidor,
            s.mac_address,
            CASE 
                WHEN a.fk_servidor IS NOT NULL THEN 1
                ELSE 0
            END AS tem_acesso
        FROM servidor s
        LEFT JOIN acesso_servidor a 
            ON s.id_servidor = a.fk_servidor 
            AND a.fk_funcionario = ${fkFuncionario}
        WHERE s.fk_empresa = ${fkEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function quantidadeAnalistasPorServidor(fkEmpresa) {
    var instrucaoSql = `
        SELECT
            s.hostname,
            COUNT(f.id_funcionario) AS analistas,
            (
                SELECT COUNT(*)
                FROM funcionario
                WHERE fk_empresa = ${fkEmpresa}
                    AND funcao = 'Analista'
            ) AS total_analistas
        FROM servidor s
        LEFT JOIN acesso_servidor a
            ON a.fk_servidor = s.id_servidor
        LEFT JOIN funcionario f
            ON f.id_funcionario = a.fk_funcionario
            AND f.funcao = 'Analista'
        WHERE s.fk_empresa = ${fkEmpresa}
        GROUP BY s.id_servidor, s.hostname;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function limparAcessos(fkFuncionario) {
    return database.executar(`
        DELETE FROM acesso_servidor 
        WHERE fk_funcionario = ${fkFuncionario}
    `);
}


function listarAnalistasDisponiveis(fkEmpresa, hostname) {
    var instrucaoSql = `
        SELECT
            f.id_funcionario,
            f.nome AS nome_analista,
            f.email
        FROM funcionario f
        JOIN servidor s
            ON s.hostname = '${hostname}'
            AND s.fk_empresa = ${fkEmpresa}
        LEFT JOIN acesso_servidor a
            ON a.fk_funcionario = f.id_funcionario
            AND a.fk_servidor = s.id_servidor
        WHERE f.fk_empresa = ${fkEmpresa}
            AND f.funcao = 'Analista'
            AND a.fk_servidor IS NULL
        ORDER BY f.nome;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function reatribuirAnalista(fkEmpresa, hostname, fkFuncionario) {
    var instrucaoSql = `
        INSERT INTO acesso_servidor (fk_funcionario, fk_servidor)
        VALUES (
            ${fkFuncionario},
            (
                SELECT id_servidor
                FROM servidor
                WHERE hostname = '${hostname}'
                    AND fk_empresa = ${fkEmpresa}
            )
        );
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirAcessos(fkFuncionario, servidores) {
    if (servidores.length === 0) return Promise.resolve();

    const values = servidores.map(id => `(${fkFuncionario}, ${id})`).join(",");

    return database.executar(`
        INSERT INTO acesso_servidor (fk_funcionario, fk_servidor)
        VALUES ${values}
    `);
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
    limparAcessos,
    inserirAcessos,
    reatribuirAnalista
};