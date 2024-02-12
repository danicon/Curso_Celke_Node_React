const express = require('express')
var cors = require('cors')
const yup = require('yup')
const nodemailer = require('nodemailer')
const { Op } = require("sequelize");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const {eAdmin} = require("./middlewares/auth")
const User = require('./models/User')
const upload = require('./middlewares/uploadImgProfile')

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
    const limit = 40
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
        order: [['id', 'DESC']],
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
            mensagem: "Erro: Usuário não encontrado!"
        })
    })

})

app.post('/user', eAdmin, async (req, res) => {
    var dados = req.body;

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessario preencher todos os campos senha!").required("Erro: Necessario preencher todos os campos senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!"),
        email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!"),
        name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!")
    })

    try {
        await schema.validate(dados)
    } catch(err) {
        console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    // if(!(await schema.isValid(dados))) {
    //     return res.status(400).json({
    //         erro: true,
    //         mensagem: "Erro: Necessario preencher todos os campos!"
    //     })
    // }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este e-mail já está cadastrado!"
        })
    }

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

    const schema = yup.object().shape({
        // password: yup.string("Erro: Necessario preencher todos os campos senha!").required("Erro: Necessario preencher todos os campos senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!"),
        email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!"),
        name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!")
    })

    try {
        await schema.validate(req.body)
    } catch(err) {
        // console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    const user = await User.findOne({
        where: {
            email: req.body.email,
            id: {
                [Op.ne]: id
            }
        }
    })

    if(user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este e-mail já está cadastrado!"
        })
    }

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

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessario preencher o campo senha!").required("Erro: Necessario preencher o campo senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")

    })

    try {
        await schema.validate(req.body)
    } catch(err) {
        // console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

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


app.post('/add-user-login', async (req, res) => {
    var dados = req.body;

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessario preencher todos os campos senha!").required("Erro: Necessario preencher todos os campos senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!"),
        email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!"),
        name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!")
    })

    try {
        await schema.validate(dados)
    } catch(err) {
        console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    // if(!(await schema.isValid(dados))) {
    //     return res.status(400).json({
    //         erro: true,
    //         mensagem: "Erro: Necessario preencher todos os campos!"
    //     })
    // }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este e-mail já está cadastrado!"
        })
    }

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

app.get('/view-profile', eAdmin, async (req, res) => {
    const id = req.userId;

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
            mensagem: "Erro: Perfil não encontrado!"
        })
    })

})

app.put('/edit-profile', eAdmin, async (req, res) => {
    const id = req.userId;

    const schema = yup.object().shape({
        email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!"),
        name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!")
    })

    try {
        await schema.validate(req.body)
    } catch(err) {
        // console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    const user = await User.findOne({
        where: {
            email: req.body.email,
            id: {
                [Op.ne]: id
            }
        }
    })

    if(user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este e-mail já está cadastrado!"
        })
    }

    await User.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Perfil editado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Perfil não editado com sucesso!"
        })
    })

})

app.put('/edit-profile-password', eAdmin, async (req, res) => {
    const id = req.userId
    const {password} = req.body;

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessario preencher o campo senha!").required("Erro: Necessario preencher o campo senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")

    })

    try {
        await schema.validate(req.body)
    } catch(err) {
        // console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

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

app.post('/recover-password', async (req, res) => {

    var dados = req.body;

    const user = await User.findOne({
        attributes: ['id', 'name', 'email'],
        where: {
            email: dados.email
        }
    })
    if(user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não encontrado!"
        })
    }

    dados.recover_password = (await bcrypt.hash(user.id + user.name + user.email, 8)).replace(/\./g, "").replace(/\//g, "")

    await User.update(dados, {where: {id: user.id}})
    .then(() => {
       
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
        });
    
        var message = {
            from: process.env.EMAIL_FROM_PASS,
            to: dados.email,
            subject: "Instrução para recuperar a senha",
            text: "Prezado(a) Daniel.\n\nVocê solicitou alteração de senha.\n\nPara continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço no seu navegador: " + dados.url + dados.recover_password + " \n\nSe você não solicitou essa alteração, nenhuma ação é nescessaria. Sua senha permanecerá a mesma até que você ative este código.\n\n",
            html: "Prezado(a) Daniel.<br><br>Você solicitou alteração de senha.<br><br>Para continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço no seu navegador: <a href='" + dados.url + dados.recover_password + "'>" + dados.url + dados.recover_password + "</a> <br><br>Se você não solicitou essa alteração, nenhuma ação é nescessaria. Sua senha permanecerá a mesma até que você ative este código.<br><br>",
        };
    
        transport.sendMail(message, function(err){
            if(err) return res.status(400).json({
                erro: true,
                mensagem: "Erro: E-mail com as instruções para recuperar a senha não enviado, tente novamente!"
            })
    
            return res.json({
                erro: false,
                mensagem: "Enviado e-mail com instruções para recuperar a senha. Acesse a sua caixa de e-mail para recuperar a senha!"
            })
        })

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: E-mail com as instruções para recuperar a senha não enviado, tente novamente!"
        })
    })

})

app.get('/val-key-recover-pass/:key', async (req, res) => {

    const {key} = req.params

    const user = await User.findOne({
        attributes: ['id'],
        where: {
            recover_password: key
        }
    })
    if(user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Link invalido!"
        })
    }

    return res.json({
        erro: false,
        mensagem: "Chave é valida!"
    })

})

app.put('/update-password/:key', async (req, res) => {

    const {key} = req.params
    const {password} = req.body;

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessario preencher o campo senha!").required("Erro: Necessario preencher o campo senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")

    })

    try {
        await schema.validate(req.body)
    } catch(err) {
        // console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    var senhaCrypt = await bcrypt.hash(password, 8)

    await User.update({password: senhaCrypt, recover_password: null}, {where: {recover_password: key}})
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

app.put('/edit-profile-image', eAdmin, upload.single('image'), async (req, res) => {
    if(req.file) {

        await User.update({image: req.file.filename}, {where: {id: req.userId}})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Imagem do perfil editado com sucesso!"
            })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Imagem do perfil não editado com sucesso!"
            })
        })
        // console.log(req.file)
    } else {
        // console.log(req.file)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Selecione uma imagen valida JPEG ou PNG!"
        })
    }
  
})

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080 http://localhost:8080")
})