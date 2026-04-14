const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

function criarTarefa() {
  const textoTarefa = inputTarefa.value.trim();

  if (textoTarefa === "") {
    alert("Digite uma tarefa.");
    return;
  }

  const item = document.createElement("li");

  const texto = document.createElement("span");
  texto.textContent = textoTarefa;

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const btnConcluir = document.createElement("button");
  btnConcluir.textContent = "Concluir";
  btnConcluir.classList.add("btnConcluir");

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("btnRemover");

  btnConcluir.addEventListener("click", () => {
    item.classList.toggle("concluida");
  });

  btnRemover.addEventListener("click", () => {
    item.remove();
  });

  acoes.appendChild(btnConcluir);
  acoes.appendChild(btnRemover);

  item.appendChild(texto);
  item.appendChild(acoes);

  listaTarefas.appendChild(item);

  inputTarefa.value = "";
  inputTarefa.focus();
}

btnAdicionar.addEventListener("click", criarTarefa);

inputTarefa.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    criarTarefa();
  }
});