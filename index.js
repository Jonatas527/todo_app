const express = require("express")
const exphbs = require("express-handlebars")
const mysql =require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(express.static('public'))

//converter dados do formulario em objeto js
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())


//rotas

app.post('/completar', (requisicao, resposta) => {
    const id = requisicao.body.id

    const sql =`
        UPDATE tarefas 
        SET completa ='1'
        WHERE id = ${id}
    `
    conexao.query(sql, (erro) =>{
        if(erro) {
           return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.post('/criar', (requisicao, resposta) =>{
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES('${descricao}','${completa}') 
    `

    conexao.query(sql, (erro) =>{
        if(erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
    })

})

app.get('/', (requisicao, reposta) => {

    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql,(erro,dados) => {
        if(erro){
            return console.log(erro)
        }

        const tarefas = dados.map((dado) =>{
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false  : true
            }
        })

        reposta.render('home', {tarefas})
    })
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


