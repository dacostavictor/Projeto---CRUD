//lógica para capturar os dados do HTML
const form = document.getElementById("user-form");
const userList = document.getElementById("user-list");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //evitar o formulário recarregar a página
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  console.log(nome);
  console.log(email);

  cadastrarUsuario(nome, email); //chamar a função cadastrar usuário
});

function cadastrarUsuario(nome, email) {
  fetch("/api/users/cadastrar", {
    //caminho para o servidor (backend)
    method: "POST",
    headers: { "Content-Type": "application/json" }, //mensagem é do tipo JSON
    body: JSON.stringify({ nome, email }), //converter o objeto em uma string json
  }).then(() => {
    form.reset(); //limpar o formulário
  });
}
