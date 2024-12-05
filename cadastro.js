document.getElementById("form_cadastro").addEventListener("submit", function(event)
{
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var data = document.getElementById("data").value;
    var valor = document.getElementById("valor").value;
    var des = document.getElementById("des");
    var rec = document.getElementById("rec");

    if(des.checked && rec.checked == false){
        valor = valor * (-1)
        var conta = {nome:nome, descricao:descricao, data:data, valor:valor}

        var lista_contas = JSON.parse(localStorage.getItem('lista_contas')) || [];

        lista_contas.push(conta)

        localStorage.setItem('lista_contas', JSON.stringify(lista_contas))

        document.getElementById('form_cadastro').reset()

        exibir_lista()

    }else if (rec.checked && des.checked == false){
        var conta = {nome:nome, descricao:descricao, data:data, valor:valor}

        var lista_contas = JSON.parse(localStorage.getItem('lista_contas')) || [];

        lista_contas.push(conta)

        localStorage.setItem('lista_contas', JSON.stringify(lista_contas))

        document.getElementById('form_cadastro').reset()

        exibir_lista()

    } else if(des.checked && rec.checked){
        alert("Marque apenas uma opção!")
    }
})

function exibir_lista(){
    var lista_contas = JSON.parse(localStorage.getItem('lista_contas'))||[];
    
    var output=document.getElementById('output')

    output.innerHTML= '';

    for(let i=0;i<lista_contas.length;i++) 
        {
            //Cria a variável li e cria o elemento (tag) li 
            let li= document.createElement('li')
            li.textContent = 'Nome: '+lista_contas[i].nome+', Data: '+ lista_contas[i].data+', Valor: R$'+lista_contas[i].valor;
            output.appendChild(li)
        }
}


// Renderiza a lista de movimentações
function renderizarLista() {
  output.innerHTML = ""; // Limpa a lista atual
  //pra cada elemento da função movimentação em posição index, o arrow ta executando o que vem a seguir
  movimentacao.forEach((movimentacao, index) => { 
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${movimentacao.nome}<br>
      Descrição: ${movimentacao.descricao}<br>
      Data: ${movimentacao.data}<br>
      Valor: R$ ${movimentacao.valor.toFixed(2)}<br>
      <button onclick="editarMovimentacao(${index})">Editar</button>
      <button onclick="excluirMovimentacao(${index})">Excluir</button>
    `;
    output.appendChild(listItem);
  });
}

// Função para editar uma movimentação
function editarMovimentacao(index) {
  const movimentacao = movimentacoes[index];
  document.getElementById("nome").value = movimentacao.nome;
  document.getElementById("descricao").value = movimentacao.descricao;
  document.getElementById("data").value = movimentacao.data;
  document.getElementById("valor").value = movimentacao.valor;
  document.getElementById("rec").checked = movimentacao.tipo === "Receita";
  document.getElementById("des").checked = movimentacao.tipo === "Despesa";

  // Remove a movimentação para ser atualizada
  movimentacoes.splice(index, 1);
  renderizarLista();
}

// Função para excluir uma movimentação
function excluirMovimentacao(index) {
  movimentacoes.splice(index, 1); // Remove do array
  renderizarLista(); // Atualiza a lista
}
