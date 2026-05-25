var database = require("../database/config");
function enviarMensagem(nome, sobrenome, email, mensagem) {
    console.log("ACESSEI O FALE CONOSCO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mensagem():", nome, sobrenome, email, mensagem);
    
    var sqlMensagem = `
        INSERT INTO  Contato_inicial (nome, sobrenome, email, mensagem) VALUES ('${nome}', '${sobrenome}', '${email}', '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + sqlMensagem);

    return database.executar(sqlMensagem); 
}

module.exports = {
    enviarMensagem 
};