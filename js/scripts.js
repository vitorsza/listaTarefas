// Selecionando elementos
const form = document.querySelector("#form");
const inputTarefa = document.querySelector("#inputTarefa");
const msgErroInpTarefa = document.querySelector("#msgErroInpTarefa");
const containerTarefas = document.querySelector("#containerTarefas");

// Eventos
form.addEventListener("submit", validarForm);
inputTarefa.addEventListener("input", removerErro);
containerTarefas.addEventListener("click", detectCliqueTarefa);

// Funções

// Função que valida o formulário
function validarForm(event) {
  event.preventDefault();

  // Verifica se usuário não informou uma tarefa
  if (inputTarefa.value === "") {
    exibirErro("Por favor, informe uma tarefa");

    return;
  }

  adicionarTarefa();
}

// Função que exibe o erro de validação do formulário
function exibirErro(msgErro) {
  inputTarefa.classList.add("erro");

  msgErroInpTarefa.textContent = msgErro;
  msgErroInpTarefa.classList.add("ativo");
}

// Função que remove o erro de validação do formulário
function removerErro() {
  inputTarefa.classList.remove("erro");

  msgErroInpTarefa.textContent = "";
  msgErroInpTarefa.classList.remove("ativo");
}

// Função que adiciona uma tarefa
function adicionarTarefa() {
  const tarefa = document.createElement("div");

  tarefa.classList.add("tarefa");
  tarefa.innerHTML = `<div class="box-selecao-tarefa">
                        <i class="bi bi-circle icone-selecao-tarefa"></i>
                      </div>
                      <div class="txt-tarefa">${inputTarefa.value}</div>
                      <div class="box-delecao-tarefa">
                        <i class="bi bi-trash-fill"></i>
                      </div>`;

  containerTarefas.classList.add("ativo");
  containerTarefas.appendChild(tarefa);

  inputTarefa.value = "";
  inputTarefa.focus();
}

// Função que detecta um clique na área de tarefas
function detectCliqueTarefa(event) {
  // Verifica se elemento clicado é o ícone de seleção de tarefa
  if (event.target.classList.contains("icone-selecao-tarefa")) {
    marcarTarefa(event.target);
  }

  // Verifica se elemento clicado é o ícone de deleção de tarefa
  if (event.target.classList.contains("bi-trash-fill")) {
    deletarTarefa(event.target);
  }
}

// Função que marca uma tarefa como concluída
function marcarTarefa(iconeSelecTarefa) {
  const tarefa = iconeSelecTarefa.closest(".tarefa");

  // Verifica se tarefa não está marcada como concluída
  if (!tarefa.classList.contains("marcada")) {
    tarefa.classList.add("marcada");

    iconeSelecTarefa.classList.remove("bi-circle");
    iconeSelecTarefa.classList.add("bi-check-circle-fill");

    containerTarefas.appendChild(tarefa);
  } else {
    tarefa.classList.remove("marcada");

    iconeSelecTarefa.classList.remove("bi-check-circle-fill");
    iconeSelecTarefa.classList.add("bi-circle");
  }
}

// Função que deleta uma tarefa
function deletarTarefa(iconeDelecTarefa) {
  iconeDelecTarefa.closest(".tarefa").remove();

  // Verifica se área de tarefas está vazia
  if (containerTarefas.innerHTML === "") {
    containerTarefas.classList.remove("ativo");
  }
}
