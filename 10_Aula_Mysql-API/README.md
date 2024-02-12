Sequencia para criar o projeto

Instalar tds as dependencias pelo package.json
# npm install

Criar o arq package
### npm init

### npm install express

Rodar o projeto
### node app.js

Acessar
### http://localhost:8080

Modulo para reiniciar servidor sempre q tiver alguma alteração, g globalmente
### npm install -g nodemon

Verificar o BD mysql no CMD
# mysql -h localhost -u root -p

Comando basicos mysql:
Criar a base de dados
# create database celke character set utf8mb4 collate utf8mb4_unicode_ci;

Criar tabela
# create table `users` (
# 	`id` int not null auto_increment,
# 	`name` varchar(220) collate utf8mb4_unicode_ci default null,
# 	`email` varchar(220) collate utf8mb4_unicode_ci default null,
# 	`password` varchar(220) collate utf8mb4_unicode_ci default null,
# 	primary key (`id`)
# )engine=innoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

Selecionar registro no BD
# select id, name, email from users;

cadastrar um registro no BD
# insert into users (name, email) values ("Daniel", "dancon.alferes@gmail.com");

limitar qnt de registros
# select id, name, email from users limit 3;

limitar qnt de registro e indicar o inicio
ex.
pg 1 = 1,2
pg 2 = 3,4
pg 3 = 5,6
# select id, name, email from users limit 2 offset 4;

Acrescentar condição na busca de registro
# select id, name, email from users where email= 'dancon.alferes@gmail.com' limit 1;

Acrescentar mais de uma condição na busca de registro
# select id, name, email from users where email= 'dancon.alferes@gmail.com' and name='Daniel' limit 1;
# select id, name, email from users where email= 'dancon.alferes@gmail.com' or name='Daniel' limit 1;

Oredenar os registros
# select id, name, email from users order by id asc;
# select id, name, email from users order by id desc;

editar registro
# update users set name='Daniel 2', email='dancon.alferes2@gmail.com' where id=2;

apagar registro
# delete from users where id=7;

sequelize é uma dependencia js falcilita o gerenciamento de um BD sql
# npm install --save sequelize

Instalar o drive do BD
# npm install --save mysql2

Instalar Modulo para criptografar a senha
# npm install --save bcryptjs

Instalkar a dependencia JWT
# npm install --save jsonwebtoken

Gerenciar variaveis de ambiente
# npm install --save dotenv 

Permite acesso a API
# npm install --save cors

Validar campo
# npm install --save yup

Modulo para enviar email
# npm install --save nodemailer

Multer é um middleware node.js para manipulação multipart/form-data, usado para o upload de arquivos.
# npm install --save multer