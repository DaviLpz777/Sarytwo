const pedidos = [];
let total = 0;

const comidas = [
  { nome: "Smash Sary", preco: 18.00, desc: "Clássico e delicioso", img: "comidas/smash.jpg" },
  { nome: "Smash Duplo Sary", preco: 24.00, desc: "Mais carne, mais sabor", img: "comidas/smash-duplo.jpg" },
  { nome: "Little Sary", preco: 22.00, desc: "Perfeito para os pequenos", img: "comidas/little.jpg" },
  { nome: "Chicken Sary", preco: 19.90, desc: "Frango crocante com molho especial", img: "comidas/chicken.jpg" },
  { nome: "Canganceiro", preco: 26.00, desc: "Um sabor do sertão", img: "comidas/cangaceiro.jpg" },
  { nome: "Miserê", preco: 28.00, desc: "Simplicidade deliciosa", img: "comidas/misere.jpg" },
  { nome: "Na Moral", preco: 28.00, desc: "Pra quem gosta de tudo", img: "comidas/na-moral.jpg" },
  { nome: "Vei", preco: 28.00, desc: "Tá ligado!", img: "comidas/vei.jpg" },
  { nome: "Maria Bonita", preco: 30.00, desc: "Sabor arretado", img: "comidas/maria-bonita.jpg" },
  { nome: "Migué", preco: 30.00, desc: "É bom mesmo!", img: "comidas/migue.jpg" },
  { nome: "Talarico", preco: 34.00, desc: "Você vai se apaixonar", img: "comidas/talarico.jpg" },
  { nome: "É Barril", preco: 34.00, desc: "Só sucesso", img: "comidas/barril.jpg" }
];

const bebidas = [
  { nome: "Coca-Cola Original 1L", preco: 10.00, desc: "Gelaaaaada!" },
  { nome: "Guaraná Antarctica Lata", preco: 5.00, desc: "350ml puro sabor" },
  { nome: "Coca-Cola Lata", preco: 5.00, desc: "Clássica na medida certa" },
  { nome: "Coca-Cola Zero Lata", preco: 5.00, desc: "Zero açúcar, 100% sabor" },
  { nome: "Suco de Morango", preco: 14.00, desc: "Natural e refrescante" },
  { nome: "Água", preco: 4.00, desc: "Hidratação sempre" }
];

const combos = [
  { nome: "Batata Pequena + Refri Lata", preco: 16.00, desc: "Perfeito para acompanhar" },
  { nome: "Onion Rings + Refri Lata", preco: 20.00, desc: "Crocrância e sabor" }
];

function gerarItens(lista, destinoId) {
  const container = document.getElementById(destinoId);
  container.innerHTML = `<h2 class="text-center text-dark">${destinoId.toUpperCase()}</h2>`;
  const row = document.createElement('div');
  row.className = 'row';

  lista.forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 item';
    col.innerHTML = `
      ${item.img ? `<img src="${item.img}" class="img-fluid mb-3 rounded" style="max-height: 150px;">` : ''}
      <p class="item-nome">${item.nome} <span class="text-warning">R$${item.preco.toFixed(2)}</span></p>
      <p class="item-desc">${item.desc}</p>
      <button class="btn btn-primary" onclick="adicionarPedido('${item.nome}', ${item.preco})">Adicionar</button>
    `;
    row.appendChild(col);
  });

  container.appendChild(row);
}

function adicionarPedido(nome, preco) {
  const existente = pedidos.find(p => p.nome === nome);
  if (existente) {
    existente.qtd++;
  } else {
    pedidos.push({ nome, preco, qtd: 1 });
  }
  atualizarPedidos();
}

function removerPedido(nome) {
  const index = pedidos.findIndex(p => p.nome === nome);
  if (index !== -1) {
    if (pedidos[index].qtd > 1) {
      pedidos[index].qtd--;
    } else {
      pedidos.splice(index, 1);
    }
    atualizarPedidos();
  }
}

function atualizarPedidos() {
  const lista = document.getElementById('lista-pedidos');
  const totalEl = document.getElementById('total');
  const aviso = document.getElementById('aviso');
  const botoes = document.getElementById('botoes-confirmacao');

  lista.innerHTML = '';
  total = 0;

  if (pedidos.length === 0) {
    aviso.style.display = 'block';
    botoes.style.display = 'none';
    totalEl.textContent = `R$ 0.00`;
    return;
  } else {
    aviso.style.display = 'none';
    botoes.style.display = 'flex';
  }

  pedidos.forEach(p => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const quantidadeTexto = p.qtd > 1 ? ` x${p.qtd}` : '';
    li.innerHTML = `
      <span>${p.nome}${quantidadeTexto} - R$${(p.preco * p.qtd).toFixed(2)}</span>
      <button class="btn btn-sm btn-danger" onclick="removerPedido('${p.nome}')">Remover</button>
    `;

    lista.appendChild(li);
    total += p.preco * p.qtd;
  });

  totalEl.textContent = `R$${total.toFixed(2)}`;
}

function cancelarPedido() {
  pedidos.length = 0;
  atualizarPedidos();
}

function finalizarPedido() {
  if (pedidos.length === 0) return;
  alert("Pedido finalizado com sucesso! Obrigado 😊");
  cancelarPedido();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  gerarItens(comidas, 'comidas');
  gerarItens(bebidas, 'bebidas');
  gerarItens(combos, 'combos');
  atualizarPedidos();
});
