const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// CONEXÃO COM BANCO
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'db_conteiner'
})

//TESTE DE CONEXÃO
db.connect(function (err) {
    if (err) { throw err }
    else {
        console.log("Conectado a base de dados!")
    }
})

/*-------------------------------CRUD CONTEINERS-----------------------------------*/

// CREATE
app.post('/conteiner/criar', (req, res) => {
    const nome = req.body.nome
    const cliente = req.body.cliente
    const tipo = req.body.tipo
    const status = req.body.status
    const categoria = req.body.categoria

    db.query('INSERT INTO conteiner (nome, cliente, tipo, status, categoria) VALUES (?,?,?,?,?)',
        [nome, cliente, tipo, status, categoria], (err, result) => {
            if (err) {
                console.log(err)
            }
        }
    )
})

//READ
app.get("/conteiner", (req, res) => {
    db.query("SELECT * FROM conteiner", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//UPDATE
app.put('/conteiner/update', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const cliente = req.body.cliente;
    const tipo = req.body.tipo;
    const status = req.body.status;
    const categoria = req.body.categoria;
    //update conteiner set cliente='fff', tipo='40' where id='ABCD3333333';
    db.query("UPDATE conteiner SET nome=?, cliente = ?,tipo = ?,status = ?,categoria = ? WHERE id = ?",
        [nome, cliente, tipo, status, categoria, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

//DELETE
app.delete('/conteiner/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM conteiner WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})



/*------------------------------------------------------------CRUD MOVIMENTAÇÕES-------------------------------------------------------------*/

/* CREATE - MOVIMENTAÇÃO*/
app.post('/movimentacao/criar', (req, res) => {
    const id_conteiner = req.body.id_conteiner
    const tipo = req.body.tipo
    const inicio = req.body.inicio
    const fim = req.body.fim

    db.query("INSERT INTO movimentacao (id_conteiner, tipo, inicio, fim) VALUES (?,?,?,?)",
        [id_conteiner, tipo, inicio, fim], (err, result) => {
            if (err) {
                console.log(err)
            }
        }
    )
})

//READ- MOVIMENTAÇÃO
app.get("/movimentacao", (req, res) => {
    db.query(`SELECT * FROM movimentacao `, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

/*UPDATE- MOVIMENTAÇÃO*/
app.put('/movimentacao/update', (req, res) => {

    const tipo = req.body.tipo
    const inicio = req.body.inicio
    const fim = req.body.fim
    const id = req.body.id


    db.query(`UPDATE movimentacao SET tipo=?, inicio=?, fim=? WHERE id = ?`,
        [tipo, inicio, fim, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

/*DELETE- MOVIMENTAÇÃO*/
app.delete('/movimentacao/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM movimentacao WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

/*------------------------------------------------------------RELATORIO-------------------------------------------------------------*/
app.get("/relatorio", (req, res) => {
    db.query(`
    select c.cliente, count(*) as total_mov, m.tipo
    from movimentacao m join conteiner c
    on m.id_conteiner = c.id
    group by c.cliente, m.tipo`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


//RODAR API
app.listen(8080, () => { console.log("servidor rodando na porta 8080...") });