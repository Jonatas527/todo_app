const express = require("express")
const exphbs = require("express-handlebars")
const mysql =require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(express.static('public'))

app.get('/', (requisicao, reposta) => {
    reposta.render('home')
})

const conexao = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306

})

conexao.connect((erro) => {
    if(erro){
        return console.log(erro)
    }

    console.log("estou conectado ao mysql ")

    app.listen(3000, () => {
        console.log("servidor rodando na pota 3000")
    })
})


