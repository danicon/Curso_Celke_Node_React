const Sequelize =  require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o BD com sucesso!")
}).catch(function(){
    console.log("Erro: Conexão com o BD não realizada com sucesso!")
})

module.exports = sequelize;