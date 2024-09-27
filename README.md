Sistema de login criado para o projeto de controle de acesso com IoT

Tecnologias usadas: **nodejs**, **postgresql** e **expressjs**

Digite no terminal **npm install** para instalar as dependências.

Criar tabela **users** com o seguinte código:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL
);
