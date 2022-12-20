const Sequileze = require("sequelize")
const db = require('./db')

const Usuario = db.define('users', {
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
    }
})

Usuario.sync()

module.exports = Usuario;