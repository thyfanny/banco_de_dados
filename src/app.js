import express from 'express';
const app = express();

//indicar para o express ler body com json
app.use(express.json())

//mock
const usuarios = [
  {cpf: 123, nome: "Mingi", data_nascimento: '(1999-8-18)'},
  {cpf: 456, nome: "Thyfanny", data_nascimento: "(2003-1-28)"}
]

//retorna o usuario pelo cpf
function buscarUser(cpf){
  return usuarios.filter(usuario => usuario.cpf == cpf)
}

//encontrar o index do usuario
function buscaPos(cpf){
  return usuarios.findIndex(usuario => usuario.cpf == cpf)
}

//rota padrão ou raiz
app.get('/', (req, res) => {
    res.send('Rota raiz')
  })

//lista usuários
app.get('/usuarios', (req, res) => {
    res.status(200).send(usuarios)
  })

//lista usuario por cpf
app.get('/usuarios/:cpf', (req, res) => {
    let index = req.params.cpf
    res.json(buscarUser(index))
  })

//adiciona usuario
app.post('/usuarios', (req, res) => {
    usuarios.push(req.body)
    res.status(201).send("Usuário cadastrado com sucesso")
  })

//delete
app.delete('/usuarios/:cpf', (req, res) => {
    let index = buscaPos(req.params.cpf)
    usuarios.splice(index, 1)
    res.send("Usuário excluído com sucesso")
  })

export default app
