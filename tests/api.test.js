import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";

const db = require("../db");
const app = require("../expressApp");

describe("API de usuários", () => {
  let queryMock;

  beforeEach(() => {
    queryMock = vi.spyOn(db, "query").mockImplementation(() => {});
  });

  afterEach(() => {
    queryMock.mockRestore();
  });

  describe("POST /api/users/cadastrar/", () => {
    it("deve cadastrar um usuário com sucesso", async () => {
      queryMock.mockImplementation((sql, params, callback) => {
        callback(null, { insertId: 1 });
      });

      const res = await request(app)
        .post("/api/users/cadastrar/")
        .send({ nome: "Maria", email: "maria@test.com" });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        id: 1,
        nome: "Maria",
        email: "maria@test.com",
      });
      expect(queryMock).toHaveBeenCalledWith(
        "INSERT INTO users (nome, email) VALUES (?, ?)",
        ["Maria", "maria@test.com"],
        expect.any(Function),
      );
    });

    it("deve retornar 500 se o banco der erro", async () => {
      queryMock.mockImplementation((sql, params, callback) => {
        callback(new Error("Erro no banco"));
      });

      const res = await request(app)
        .post("/api/users/cadastrar/")
        .send({ nome: "Maria", email: "maria@test.com" });

      expect(res.status).toBe(500);
    });
  });

  describe("GET /api/users/listar", () => {
    it("deve listar os usuários cadastrados", async () => {
      const fakeUsers = [
        { id: 1, nome: "Maria", email: "maria@test.com" },
        { id: 2, nome: "João", email: "joao@test.com" },
      ];
      queryMock.mockImplementation((sql, callback) => {
        callback(null, fakeUsers);
      });

      const res = await request(app).get("/api/users/listar");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeUsers);
    });

    it("deve retornar 500 se o banco der erro", async () => {
      queryMock.mockImplementation((sql, callback) => {
        callback(new Error("Erro no banco"));
      });

      const res = await request(app).get("/api/users/listar");
      expect(res.status).toBe(500);
    });
  });

  describe("PUT /api/users/editar/:id", () => {
    it("deve atualizar um usuário com sucesso", async () => {
      queryMock.mockImplementation((sql, params, callback) => callback(null));

      const res = await request(app)
        .put("/api/users/editar/1")
        .send({ nome: "Maria Silva", email: "maria.silva@test.com" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: "1",
        nome: "Maria Silva",
        email: "maria.silva@test.com",
      });
    });

    it("deve retornar 500 se o banco der erro", async () => {
      queryMock.mockImplementation((sql, params, callback) => {
        callback(new Error("Erro no banco"));
      });

      const res = await request(app)
        .put("/api/users/editar/1")
        .send({ nome: "X", email: "x@test.com" });

      expect(res.status).toBe(500);
    });
  });

  describe("DELETE /api/users/excluir/:id", () => {
    it("deve excluir um usuário com sucesso", async () => {
      queryMock.mockImplementation((sql, params, callback) => callback(null));

      const res = await request(app).delete("/api/users/excluir/1");
      expect(res.status).toBe(204);
    });

    it("deve retornar 500 se o banco der erro", async () => {
      queryMock.mockImplementation((sql, params, callback) => {
        callback(new Error("Erro no banco"));
      });

      const res = await request(app).delete("/api/users/excluir/1");
      expect(res.status).toBe(500);
    });
  });
});
