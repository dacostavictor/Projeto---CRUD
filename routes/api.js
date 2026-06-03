//rotas para o CRUD de usuários
//importar o express
const express = require("express");

//modularizar as rotas
const router = express.Router();

//conectar ao banco de dados
const db = require("../db");

//criar as rotas
//CREATE: POST (INSERT)
//rota para cadastrar: /api/users/
router.post("/cadastrar/", (req, res) => {
  const { nome, email } = req.body;
  //executar a instrução sql
  db.query(
    "INSERT INTO users (nome, email) VALUES (?, ?)",
    [nome, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, nome, email });
    },
  );
});

//READ: GET (SELECT)
router.get("/listar", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//UPDATE: PUT: (UPDATE)
router.put("/editar/:id", (req, res) => {
  //extrair os dados
  const { nome, email } = req.body; //corpo da requisição
  const { id } = req.params; //parametro da requisição

  //executar a instrução sql
  (db.query("UPDATE users SET nome = ?, email = ? WHERE id = ?", [
    nome,
    email,
    id,
  ]),
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id, nome, email });
    });
});

//DELETE: DELETE (DELETE)
router.delete("/excluir/:id", (req, res) => {
  const { id } = req.params;

  //executar a instrução sql
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

//exportar as rotas criadas
module.exports = router;
