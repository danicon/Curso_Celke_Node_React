const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Olá Daniel!");
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
})