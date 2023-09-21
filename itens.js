let produtos = [
  {
    "imagem": "https://i.ibb.co/F6x5dVb/product-image-cadeira.jpg",
    "nome": "Cadeira Gamer RGB - Preta com Iluminação (Led)",
    "preco": 959.90,
    "quantidade": 1
  },
  {
    "imagem": "https://i.ibb.co/zVLB7X5/product-image-headset.jpg",
    "nome": "Headset Gamer RGB Preto",
    "preco": 119.80,
    "quantidade": 1
  },
  {
    "imagem": "https://i.ibb.co/TY8KQHL/product-image-monitor.jpg",
    "nome": "Monitor Gamer Curvo 49 DQHD, 240Hz, 1ms, HDMI",
    "preco": 8599.90,
    "quantidade": 1
  },
  {
    "imagem": "https://i.ibb.co/vYNz0mB/product-image-teclado.jpg",
    "nome": "Teclado Gamer Mecânico Low Profile RGB AW510K 580",
    "preco": 1002.00,
    "quantidade": 1
  },
  {
    "imagem": "https://i.ibb.co/ZSwnWbM/product-image-patinho.jpg",
    "nome": "brinquedo pato de borracha",
    "preco": 5.50,
    "quantidade": 1
  },
];

const produtosLista = document.getElementById('produtos-lista');
const totalElement = document.querySelector('.total strong');

function exibirProdutos(produtos) {
  const html = produtos.map((produto, index) => {
    return `
      <div class="item">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="details">
          <div class="title">${produto.nome}</div>
          <div class="price-qty">
            <div class="price">R$ ${produto.preco.toFixed(2)}</div>
            <div class="qty">
              <button class="sub" data-index="${index}">
                <i class="ph ph-minus"></i>
              </button>
              <span> ${produto.quantidade}</span>
              <button class="add" data-index="${index}">
                <i class="ph ph-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  return html;
}

produtosLista.innerHTML = exibirProdutos(produtos);

function calcularTotal() {
  let total = 0;

  produtos.forEach((produto) => {
    total += produto.preco * produto.quantidade;
  });

  return total.toFixed(2);
}

function atualizarTotal() {
  const total = calcularTotal();
  totalElement.textContent = `R$ ${total}`;
}

function calcularQuantidade() {
  const minusButtons = document.querySelectorAll('.qty .sub');
  const plusButtons = document.querySelectorAll('.qty .add');

  minusButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const index = button.getAttribute('data-index');
      const quantityElement = button.nextElementSibling;
      let quantity = parseInt(quantityElement.textContent);

      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
        produtos[index].quantidade = quantity - 1;
        atualizarTotal(); // Atualizar o valor total
      } else {
        quantityElement.textContent = 0;
        produtos[index].quantidade = 0;
        atualizarTotal(); // Atualizar o valor total
      }
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const index = button.getAttribute('data-index');
      const quantityElement = button.previousElementSibling;
      let quantity = parseInt(quantityElement.textContent);

      quantityElement.textContent = quantity + 1;
      produtos[index].quantidade = quantity + 1;
      atualizarTotal(); // Atualizar o valor total
    });
  });
}

calcularQuantidade();
