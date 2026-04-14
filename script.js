const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

let tarefas = [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("tarefas");

  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    renderizarTarefas();
  }
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const item = document.createElement("li");

    if (tarefa.concluida) {
      item.classList.add("concluida");
    }

    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.classList.add("btnConcluir");

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btnRemover");

    btnConcluir.addEventListener("click", () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas();
      renderizarTarefas();
    });

    btnRemover.addEventListener("click", () => {
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    });

    acoes.appendChild(btnConcluir);
    acoes.appendChild(btnRemover);

    item.appendChild(texto);
    item.appendChild(acoes);

    listaTarefas.appendChild(item);
  });
}

function criarTarefa() {
  const textoTarefa = inputTarefa.value.trim();

  if (textoTarefa === "") {
    alert("Digite uma tarefa.");
    return;
  }

  const novaTarefa = {
    texto: textoTarefa,
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarTarefas();
  renderizarTarefas();

  inputTarefa.value = "";
  inputTarefa.focus();
}

btnAdicionar.addEventListener("click", criarTarefa);

inputTarefa.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    criarTarefa();
  }
});

carregarTarefas();