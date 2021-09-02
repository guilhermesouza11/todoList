const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco))

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement('label'); // Cria elemento label
  item.classList.add ('todo-item'); // Adiciona a classe "todo-item" ao elemento label criado.
  item.innerHTML = `
    <input class="check" type="checkbox" ${status} data-indice=${indice}>
    <div class="todo-tarefa">${tarefa}</div> 
    <input class="btn-delete" type="button" value="X" data-indice=${indice}>
  ` // Criando elementos HTML
  document.getElementById('todoList').appendChild(item); // Quando chamado a função, é criado no DOM o item da lista.
}

const limparTarefas = () => {
  const todoList = document.getElementById('todoList');
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
}

const atualizarTela = () => {
  limparTarefas();
  const banco = getBanco();
  banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
} // Criando a função para atualizar a tela

const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === 'Enter'){
    const banco = getBanco();
    banco.push ({'tarefa': texto, 'status': ''})
    setBanco(banco);
    atualizarTela();
    evento.target.value = '';
  }
}

const removerItem = (indice) => { //Cria função para remover tarefa.
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizarTela();
}

const atualizarStatus = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  setBanco(banco);
  atualizarTela();
}


const clickItem = (evento) => { //Cria a função para pegar o indice de cada tarefa adicionada.
  const elemento = evento.target; // Apontando o elemento a ser clicado.
  if (elemento.type === 'button'){ // Condição para virificar se o tipo do elemento é "button".
    const indice = elemento.dataset.inidice; // Coletando indice de cada tarefa adicionada.
    removerItem(indice); // Chamando função para 'removerItem' remover tarefa.
  }else if (elemento.type === 'checkbox'){
    const indice = elemento.dataset.indice;
    atualizarStatus(indice);
  }
}

document.getElementById('novoItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
