const jwt = require('jsonwebtoken')
const {promisify} = require('util')
require('dotenv').config();

module.exports = {
    eAdmin: async function (req, res, next) {
        // return res.json({messagem: "Validar token"}) 
        const authHeader = req.headers.authorization
        const [bearer, token] = authHeader.split(" ")
    
        if(!token) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessario enviar o Login para acessar a pagina!"
            })
        }
    
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
            req.userId = decoded.id
    
            return next();
        } catch(err) {
            return res.status(401).json({
                erro: true,
                mensagem: "Erro: Necessario enviar o Login para acessar a pagina!"
            })
        }
    
        // return res.json({messagem: token}) 
    
    } 
}