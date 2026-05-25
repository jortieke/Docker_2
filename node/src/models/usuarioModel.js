var database = require("../database/config")

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        SELECT
            funcionario.id_funcionario,
            funcionario.fk_empresa, 
            funcionario.nome,
            funcionario.email,
            funcionario.funcao,
            funcionario.data_cadastro,
            servidor.mac_address
        FROM funcionario
			JOIN acesso_servidor AS acesso
				ON acesso.fk_funcionario = funcionario.id_funcionario
			JOIN servidor 
				ON servidor.id_servidor = acesso.fk_servidor
        WHERE email = '${email}' AND senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirUsuarios(id) {
    var instrucaoSql = `
        SELECT
            funcionario.id_funcionario, 
            funcionario.nome,
            funcionario.email,
            funcionario.funcao,
            funcionario.data_cadastro
        FROM funcionario
        WHERE funcionario.fk_empresa = ${id};
    `;
    return database.executar(instrucaoSql);
}

function deletarUsuario(id) {
    console.log("ACESSEI O MODEL USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o usuario de seu BD está rodando corretamente. \n\n function cadastrar():", id);
    

    var deletarUsuario = `
        DELETE FROM funcionario WHERE id_funcionario = ${id};
    `;

    return database.executar(deletarUsuario)
        .then(() => {
            return database.executar(deletarUsuario);
        });
}

function cadastrarUsuario(fk_empresa, nome, email, cpf, senha, funcao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, email, senha, funcao, fk_empresa);
    
    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, cpf, senha, funcao, fk_empresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${funcao}', '${fk_empresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


module.exports = {
    autenticar,
    cadastrarUsuario,
    deletarUsuario,
    exibirUsuarios,
};