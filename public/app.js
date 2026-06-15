const form = document.getElementById("user-form");
const userList = document.getElementById("user-list");

function cadastrarUsuario(nome, email) {
  fetch("/api/users/cadastrar/", {
    // Caminho para o servidor
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  }).then(() => {
    form.reset();
    listarUsuarios();
  });
}

function listarUsuarios() {
  fetch("/api/users/listar", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      userList.innerHTML = "";
      data.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `Nome: ${user.nome} - Email: ${user.email}
            <button onclick="editar(${user.id})" class="editar">Editar</button>
            <button onclick="excluirUsuario(${user.id})" class="excluir">Excluir</button>`;
        userList.appendChild(li);
      });
    });
}

// app.js — função editar com verificação de resposta
function editar(id) {
  const nome = prompt("Digite seu nome: ");
  const email = prompt("Digite seu email: ");

  if (!nome || nome.length === 0 || !email || email.length === 0) {
    alert("O nome e email devem ser ambos preenchidos!");
    return;
  }

  fetch(`/api/users/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao editar usuário");
      return res.json();
    })
    .then(() => {
      listarUsuarios();
    })
    .catch((err) => {
      alert("Não foi possível editar o usuário.");
      console.error(err);
    });
}

function excluirUsuario(id) {
  const confirmacao = confirm(
    `Você tem certeza de que deseja excluir o usuário selecionado?`,
  );
  if (!confirmacao) {
    return;
  }

  fetch(`/api/users/excluir/${id}`, {
    method: "DELETE",
  }).then(() => {
    listarUsuarios();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recarregar página

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  cadastrarUsuario(nome, email);
});

listarUsuarios();
