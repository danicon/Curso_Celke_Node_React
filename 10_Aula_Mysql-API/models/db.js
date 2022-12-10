const Sequelize =  require('sequelize');

const sequelize = new Sequelize('celke', 'root', 'Danel59', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o BD com sucesso!")
}).catch(function(){
    console.log("Erro: Conexão com o BD não realizada com sucesso!")
})

module.exports = sequelize;