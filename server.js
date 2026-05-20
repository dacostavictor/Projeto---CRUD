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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
