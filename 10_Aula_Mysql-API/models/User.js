const Sequileze = require("sequelize")
const db = require('./db')

const Users = db.define('users', {
    id: {
        type: Sequileze.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequileze.STRING,
        allowNull: false
    },
    email: {
        type: Sequileze.STRING,
        allowNull: false
    },
    password: {
        type: Sequileze.STRING
    }
})

// Criar a tabela
// Users.sync()

// Verificar se há alguma diferença na tabela, realiza alteração
// Users.sync({ alter: true })

module.exports = Users;