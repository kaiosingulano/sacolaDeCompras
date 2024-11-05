const typeItem = document.getElementById('input-item');
const salvarItem = document.getElementById('salvar-item');
const listaProdutos = document.getElementById('lista-produtos');
let subtotalValor = 0;

salvarItem.addEventListener('click', addItem);

function addItem(evento) {
    evento.preventDefault();
    
    if (typeItem.value === "") {
        alert("Por favor, insira um item no campo designado.");
        return;
    }
    
    const listaItem = document.createElement('li');
    listaItem.classList.add('container-produto');
    listaProdutos.appendChild(listaItem);

    const nomeBotoes = document.createElement('div');
    nomeBotoes.classList.add('nome-e-botoes');
    listaItem.appendChild(nomeBotoes);

    const nomeItem = document.createElement('p');
    nomeItem.classList.add('produto-nome');
    nomeItem.id = 'item-nome';
    nomeItem.innerText = typeItem.value;
    nomeBotoes.appendChild(nomeItem);

    const botaoEditar = document.createElement('button');
    const imagemEditar = document.createElement('img');
    imagemEditar.src = "./img/editar.svg";
    imagemEditar.alt = "Editar Item";
    botaoEditar.appendChild(imagemEditar);
    botaoEditar.classList.add('botoes-editar');
    nomeBotoes.appendChild(botaoEditar);

    botaoEditar.addEventListener("click", function () {
        editarItem(listaItem)
    })

    const botaoExcluir = document.createElement('button');
    const imagemExcluir = document.createElement('img');
    imagemExcluir.src = "./img/excluir.svg";
    imagemExcluir.alt = "Excluir Item";
    botaoExcluir.appendChild(imagemExcluir);
    botaoExcluir.classList.add('botoes-editar');
    nomeBotoes.appendChild(botaoExcluir);

    botaoExcluir.addEventListener("click", function() {
        excluirItem(listaItem)
    })

    const itemData = document.createElement('p');
    itemData.classList.add('produto-data');
    itemData.innerHTML = `${new Date().toLocaleDateString('pt-BR', {weekday: 'long'})},
     (${new Date().toLocaleDateString()}), às ${new Date().toLocaleTimeString("pt-BR", {hour: "numeric", minute: "numeric"})}`;
    listaItem.appendChild(itemData);

    const botoesFinal = document.createElement('div');
    botoesFinal.classList.add('produto-botoes');
    listaItem.appendChild(botoesFinal);

    const inputQtd = document.createElement('input');
    inputQtd.id = 'quantidade';
    inputQtd.type = 'number';
    inputQtd.min="1";
    inputQtd.placeholder = 'Qtd';
    botoesFinal.appendChild(inputQtd);

    const inputPreco = document.createElement('input');
    inputPreco.id = 'preco';
    inputPreco.type = 'number';
    inputPreco.min="0.01";
    inputPreco.step="0.01";
    inputPreco.placeholder = 'Preço';
    botoesFinal.appendChild(inputPreco);

    const botaoComprar = document.createElement('button');
    botaoComprar.id = 'add-comprados';
    botaoComprar.textContent = "Comprar";
    botoesFinal.appendChild(botaoComprar);

    botaoComprar.addEventListener("click", function (evento) {
        const quantidade = evento.currentTarget.closest('li').querySelector("#quantidade");
        const preco = evento.currentTarget.closest('li').querySelector("#preco");
        const itemTitulo = evento.currentTarget.closest('li').querySelector('#item-nome');
            
        const subtotal = document.getElementById('subtotal');
        let subtotalProduto = Number(preco.value) * Number(quantidade.value);
        subtotalValor += subtotalProduto;
        subtotal.innerHTML = `Total - R$: ${subtotalValor.toFixed(2)}`;
        

        itemTitulo.style.textDecoration = 'line-through';
        listaComprados.appendChild(listaItem);
        verificarComprados();
        verificarListaVazia();
        inputPreco.classList.add('sumir-coisas');
        inputQtd.classList.add('sumir-coisas');
        botaoComprar.classList.add('sumir-coisas');
        botaoExcluir.classList.add('sumir-coisas');
        botaoEditar.classList.add('sumir-coisas');

        const subtotalProdutoLista = document.createElement('p');
        subtotalProdutoLista.classList.add('produto-data');
        subtotalProdutoLista.innerHTML = `${(Number(quantidade.value))} x R$${(Number(preco.value)).toFixed(2)} = R$${(Number(preco.value) * Number(quantidade.value)).toFixed(2)}`;
        botoesFinal.appendChild(subtotalProdutoLista);

        const botaoDevolver = document.createElement('button');
        botaoDevolver.id = 'devolver';
        botaoDevolver.textContent = "Devolver";
        botoesFinal.appendChild(botaoDevolver);

        botaoDevolver.addEventListener("click", function (evento) {
            const itemTitulo = evento.currentTarget.closest('li').querySelector('#item-nome');
            itemTitulo.style.textDecoration = 'none';
            let valorDeduzir = subtotalProdutoLista.innerHTML.split('$');
            subtotalValor -= valorDeduzir[2];
            subtotal.innerHTML = `Total - R$: ${subtotalValor.toFixed(2)}`;
            listaProdutos.appendChild(listaItem);
            subtotalProdutoLista.remove();
            botaoDevolver.remove();

            inputQtd.classList.remove('sumir-coisas');
            inputPreco.classList.remove('sumir-coisas');
            botaoComprar.classList.remove('sumir-coisas');
            botaoExcluir.classList.remove('sumir-coisas');
            botaoEditar.classList.remove('sumir-coisas');

            verificarComprados();
            verificarListaVazia();
        })
        
    })
    
    verificarListaVazia();
    typeItem.value = "";
}

const msgListaVazia = document.getElementById('mensagem-vazia');

function verificarListaVazia() {
    if (listaProdutos.querySelectorAll('li').length === 0) {
        msgListaVazia.style.display = 'block';
    } else {
        msgListaVazia.style.display = 'none';
    }
}

const listaComprados = document.getElementById('lista-comprados');
const tituloComprados = document.getElementById('titulo-comprados');

function verificarComprados() {
    if (listaComprados.childElementCount === 0) {
        tituloComprados.style.display = 'none';
    } else {
        tituloComprados.style.display = 'block';
    }
}

const editarItem = (elemento) => {
    let atualizarItem = prompt('Digite o nome correto do produto');
    if (atualizarItem !== null && atualizarItem.trim() !== "") {
        let nomeItem = elemento.querySelector('#item-nome')
        nomeItem.textContent = atualizarItem;
    }
}

const excluirItem = (elemento) => {
    let confirmacao = confirm('Tem certeza da exclusão do item?');

    if (confirmacao) {
        elemento.remove();
        verificarListaVazia();
    }
}