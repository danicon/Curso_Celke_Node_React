const express = require('express')

const app = express();

app.get('/', (req, res) => {
    return res.json({
        erro: false,
        usuario: "Daniel",
        email: "dancon.alferes@gmail.com"
    })
})
