const exp = require("constants");
const express = require("express");
const app = express();
const port = 3000;

//passar o caminho dos arquivos estáticos
const path = require("path");

//disponibilizar os arquivos (origem)
app.use(express.static(path.join(__dirname, "public")));

//chamar a conexão com o banco de dados
const db = require("./db");

//rota principal
app.get("/", (req, res) => {
  //res.send('Teste')
  res.sendFile(path.join(__dirname, "public", "index.html"));
  //projeto-crud/public/index.html --> localhost:3000/
});

const apiRoutes = require("./routes/api"); //buscando as rotas
app.use(express.json()); //requisições do front virão no formato JSON
app.use("/api/users", apiRoutes); //definindo as rotas de usuários

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
