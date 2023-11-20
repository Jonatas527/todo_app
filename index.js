const express = require("express")

const app = express()

app.get('/', (requisicao, reposta) => {
    reposta.send("ola mundo")
})

app.listen(3000, () => {
    console.log("servidor rodando na pota 3000")
})
