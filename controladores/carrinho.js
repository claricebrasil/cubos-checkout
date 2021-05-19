const fs = require('fs/promises');
const { addBusinessDays } = require('date-fns');

async function obterCarrinho(req, res){
    const carrinho = JSON.parse(await fs.readFile('./carrinho.json'));

    res.json(carrinho);
}

async function adicionarProduto(req, res){
    const idProduto = req.body.id;
    const qntProduto = req.body.quantidade;

    if (!idProduto || !qntProduto) {
        return res.status(400)
    }

    const dados = JSON.parse(await fs.readFile('./data.json'));

    const produtoEncontrado = dados.produtos.find(produto => produto.id === idProduto);

    if (!produtoEncontrado) {
        return res.status(400).json({ mensagem: "Produto não encontrado "})
    }

    const produtoCarrinho = {
        id: produtoEncontrado.id,
        quantidade: qntProduto,
        nome: produtoEncontrado.nome,
        preco: produtoEncontrado.preco,
        categoria: produtoEncontrado.categoria,
    }

    if (quantidade > produtoEncontrado.estoque) {
        return res.status(400).json({ mensagem: "Produto fora de estoque" })
    }

    const carrinho = JSON.parse(await fs.readFile('./carrinho.json'));

    const produtoJaExiste = carrinho.produtos.findIndex(produto => produto.id === id);

    if (produtoJaExiste === -1) {
        carrinho.produtos[produtoJaExiste].quantidade += produtoCarrinho.quantidade;
    } else {
        carrinho.produtos.push(produtoCarrinho);
    }

    fs.writeFile('./dados/carrinho.json', JSON.stringify(carrinho, null, 2));

    res.status(201).json(carrinho);
}

function calcularCarrinho(carrinho) {
    const precoFrete = 5000;
    const freteGratis = 20000;

    let subTotal = 0;

    carrinho.produtos.forEach(produto => {
        subtotal += produto.preco * produto.quantidade
    });

    let valorDoFrete = 0;
    if (subTotal > freteGratis) {
        valorDoFrete = 0;
    } else {
        valorDoFrete = precoFrete;
    };

    let dataDeEntrega = addBusinessDays(Date.now(), 15);
    const totalAPagar = subTotal + valorDoFrete;

    return calcularCarrinho;
}

module.exports = {
    obterCarrinho,
    adicionarProduto
};