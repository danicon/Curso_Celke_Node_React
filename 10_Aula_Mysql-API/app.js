const express = require('express')
const User = require('./models/User')
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    await User.findAll({
        attributes: ['id', 'name', 'email'],
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

app.get('/user/:id', async (req, res) => {
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

app.post('/user', async (req, res) => {
    const {name, email} = req.body;
    
    await User.create(req.body)
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

app.put('/user', async (req, res) => {
    const {id, name, email} = req.body;

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

app.delete('/User/:id', async (req, res) => {
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



app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080 http://localhost:8080")
})