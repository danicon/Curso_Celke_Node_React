const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const User = require('./models/User')
const app = express();

app.use(express.json());

app.get('/users', ValidarToken, async (req, res) => {
    await User.findAll({
        attributes: ['id', 'name', 'email', 'password'],
        order: [['id', 'DESC']]})
    .then((users) => {
        return res.json({
            erro: false,
            users
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuários encontrados com sucesso!"
        })
    })

})

app.get('/user/:id', ValidarToken, async (req, res) => {
    const {id} = req.params;

    // await User.findAll({ where: { id: id} })
    await User.findByPk(id)
    .then((user) => {
        return res.json({
            erro: false,
            user
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário encontrado com sucesso!"
        })
    })

})

app.post('/user', ValidarToken, async (req, res) => {
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8)
    
    await User.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        })
    })

})

app.put('/user', ValidarToken, async (req, res) => {
    const {id} = req.body;

    await User.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário editado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não editado com sucesso!"
        })
    })

})

app.put('/user-senha', ValidarToken, async (req, res) => {
    const {id, password} = req.body;

    var senhaCrypt = await bcrypt.hash(password, 8)

    await User.update({password: senhaCrypt}, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Senha editado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Senha não editado com sucesso!"
        })
    })

})

app.delete('/User/:id', ValidarToken, async (req, res) => {
    const {id} = req.params;

    await User.destroy({ where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário apagado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não apagado com sucesso!"
        })
    })
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {
            email: req.body.email
        }
    })
    if(user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não encontrado!"
        })
    }

    if(!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Senha invalida!"
        })
    }

    var token = jwt.sign({id: user.id}, "2372z33tvu8lyg914k01ld9hufsm", {
        // expiresIn: 600 //10min
        expiresIn: '7d' // 7 dias
    })

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    })
})

async function ValidarToken(req, res, next) {
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
        const decoded = await promisify(jwt.verify)(token, '2372z33tvu8lyg914k01ld9hufsm')
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

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080 http://localhost:8080")
})