const express = require('express')
var cors = require('cors')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const {eAdmin} = require("./middlewares/auth")
const User = require('./models/User')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
})

app.get('/users/:page', eAdmin, async (req, res) => {
    const {page = 1} = req.params
    // console.log(page)
    const limit = 2
    var lastPage = 1

    const countUser = await User.count()
    // console.log(countUser)
    if(countUser === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuário encontrado!"
        })
    } else {
        lastPage = Math.ceil(countUser/limit)
    }

    await User.findAll({
        attributes: ['id', 'name', 'email', 'password'],
        order: [['id', 'ASC']],
        offset: Number((page * limit) - limit), 
        limit: limit
    })
    .then((users) => {
        return res.json({
            erro: false,
            users,
            countUser,
            lastPage
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuário encontrado!"
        })
    })

})

app.get('/user/:id', eAdmin, async (req, res) => {
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

app.post('/user', eAdmin, async (req, res) => {
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

app.put('/user', eAdmin, async (req, res) => {
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

app.put('/user-senha', eAdmin, async (req, res) => {
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

app.delete('/User/:id', eAdmin, async (req, res) => {
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

    await sleep(1000)

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

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
            mensagem: "Erro: Usuário ou a Senha incorreta!"
        })
    }

    var token = jwt.sign({id: user.id}, process.env.SECRET, {
        // expiresIn: 600 //10min
        expiresIn: '7d' // 7 dias
    })

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    })
})

app.get("/val-token", eAdmin, async (req, res) => {
    await User.findByPk(req.userId, {attributes: ['id', 'name', 'email']})

    .then((User) => {
        return res.json({
            erro: false,
            User
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessario enviar o Login para acessar a pagina!"
        })
    })
})


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080 http://localhost:8080")
})