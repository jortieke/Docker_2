var database = require("../database/config")

function salvarImagemPerfil(idUsuario, imagem) {
  
  const instrucao = `
    update Funcionario set imagem = '${imagem}'
      where idFuncionario = ${idUsuario};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarImagemPerfil(idUsuario) {

  const sql = `
    select imagem from Funcionario 
      where idFuncionario = ${idUsuario};
  `;

  return database.executar(sql);

}

function carregarUsuario(idUsuario) {

    var instrucaoSql = `
        SELECT 
            f.nome,
            f.nome_social,
            f.email,
            f.senha,
            f.cpf,
            f.imagem,
			(SELECT p.nivel FROM Papel p WHERE p.idPapel = ${idUsuario}) AS cargo,
            (SELECT p.descricao FROM Papel p WHERE p.idPapel = ${idUsuario}) AS descricao,
            e.razao_social AS empresa,
            e.idEmpresa
        FROM Funcionario f
        JOIN Papel p 
            ON f.fk_papel_empresa = p.idPapel
        JOIN Empresa e 
            ON p.fk_empresa = e.idEmpresa
        WHERE f.idFuncionario = ${idUsuario};
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idFuncionario, dados) {

    const promises = []

    const sqlFuncionario = `
        UPDATE Funcionario SET
            nome = '${dados.nome}',
            nome_social = '${dados.nomeSocial}',
            email = '${dados.email}',
            senha = '${dados.senha}',
            cpf = '${dados.cpf}'
        WHERE idFuncionario = ${idFuncionario};
    `
    promises.push(database.executar(sqlFuncionario))

    const sqlCargo = `
        UPDATE Papel p
        JOIN Funcionario f ON f.fk_papel_empresa = p.idPapel
        SET p.nivel = '${dados.cargo}'
        WHERE f.idFuncionario = ${idFuncionario};
    `
    promises.push(database.executar(sqlCargo))

    return Promise.all(promises)
}

module.exports = {
  salvarImagemPerfil,
  buscarImagemPerfil,
  carregarUsuario,
  editar
}