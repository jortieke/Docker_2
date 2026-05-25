#SCRIPT HORUS-MONITORING

CREATE DATABASE horus_db;

USE horus_db;

CREATE TABLE localizacao(
id_localizacao INT PRIMARY KEY AUTO_INCREMENT,
uf CHAR(2),
cidade VARCHAR(45),
bairro VARCHAR(45),
logradouro VARCHAR(45),
numero INT,
cep CHAR(11)
);


CREATE TABLE empresa(
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
razao_social VARCHAR(45),
cnpj CHAR(15),
telefone_empresa CHAR,
token_empresa CHAR(8),
fk_localizacao INT,
 FOREIGN KEY(fk_localizacao) REFERENCES localizacao (id_localizacao)
);


CREATE TABLE funcionario(
id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
cpf CHAR(11),
senha VARCHAR(45),
funcao ENUM('Analista','Gestor'),
fk_empresa INT,
FOREIGN KEY(fk_empresa) REFERENCES empresa (id_empresa),
imagem VARCHAR(255)
);

CREATE TABLE servidor(
id_servidor INT PRIMARY KEY AUTO_INCREMENT,
data_instalacao DATE,
tag_servidor VARCHAR(45),
fk_empresa INT,
FOREIGN KEY(fk_empresa) REFERENCES empresa (id_empresa)
);

CREATE TABLE componentes(
id_componente INT PRIMARY KEY AUTO_INCREMENT,
nome_componente VARCHAR(45),
tipo_componente VARCHAR(45),
unidade_medida VARCHAR(45)
);

CREATE TABLE servidor_componente(
id_componente_v INT PRIMARY KEY AUTO_INCREMENT,
fk_componente INT,
fk_servidor INT,
limite VARCHAR(45),
FOREIGN KEY(fk_componente) REFERENCES  componentes (id_componente),
FOREIGN KEY(fk_servidor) REFERENCES servidor (id_servidor)
);

CREATE TABLE registro_alerta(
id_alerta INT PRIMARY KEY AUTO_INCREMENT,
data_alerta DATETIME,
criticidade VARCHAR(45),
fk_servidor_componente INT,
FOREIGN KEY (fk_servidor_componente) REFERENCES servidor_componente (id_componente_v)
);
 
 
 CREATE TABLE contato_inicial(
 id_componente INT PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(45),
 sobrenome VARCHAR(45),
 email VARCHAR(45),
 mensagem VARCHAR(255)
 );