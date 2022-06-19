// Váriaveis dos modulos node.
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var rateLimit = require("express-rate-limit");
var helmet = require('helmet');
var app = express()
var server = http.createServer(app);
// Limitador. 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// criar base de dados.
var db = new sqlite3.Database('./database/alunos.db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '.')));
app.use(helmet());
app.use(limiter);

// cria a base de dados caso ela ainda não exista, e cria também todas as nossas tabelas que são os campos do form.
db.run('CREATE TABLE IF NOT EXISTS aluno(nome TEXT, sobrenome TEXT, email TEXT, ra TEXT, curso TEXT, ano TEXT)');

// redireciona para o form.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './form.html'));
});

// Faz o envio do form e responde com o sucesso se for o caso.
app.post('/add', function (req, res) {
    db.serialize(() => {
        db.run('INSERT INTO aluno(nome, sobrenome, email, ra, curso, ano) VALUES(?,?,?,?,?,?)', [req.body.nome, req.body.sobrenome, req.body.email, req.body.ra, req.body.curso, req.body.ano], function (err) {
            if (err) {
                return console.log(err.message);
            }
            res.send("Envio de formulário feito com sucesso!");
        });
    });
});

// finaliza a conexão com o banco.
app.get('/close', function (req, res) {
    db.close((err) => {
        if (err) {
            res.send('Não foi possivel fechar a conexão.');
            return console.error(err.message);
        }
        console.log('Fechando sua conexão com o banco, aguarde.');
        res.send('Conexão fechada com sucesso!');
    });
});

app.listen(3000)