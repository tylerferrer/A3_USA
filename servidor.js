const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('.'))

app.post('/alunos', (req, res) =>{
    console.log(req.body)
    res.send('Matriculado com sucesso!')
})

app.listen(3000)