const fs = require('fs/promises');

async function obterCarrinho(req, res){
    const carrinho = JSON.parse(await fs.readFile('./carrinho.json'));

    res.json(carrinho);
}

async function adicionarProduto(req, res){
    const idProduto = req.body.id;
    const qntProduto = req.body.quantidade;

    const estoque = JSON.parse(await fs.readFile('./data.json'));

    const produtoEncontrado = estoque.produtos.find(produto => produto.id === idProduto);

    //validação se o produto existe
    //validação de que a quantidade do request é menor ou igual ao estoque

    const produtoCarrinho = {
        id: produtoEncontrado.id,
        quantidade: qntProduto,
        nome: produtoEncontrado.nome,
        preco: produtoEncontrado.preco,
        categoria: produtoEncontrado.categoria,
    }

    if (!produtoEncontrado){
        res.json({mensagem: ""});

        return;
    };

    const carrinho = JSON.parse(await fs.readFile('./carrinho.json'));

    //validar se o produto já existe no carrinho
    carrinho.produtos[0].quantidade += 1; //se já existir, acrescentar apenas a quantidade

    carrinho.produtos.push(produtoCarrinho);

    fs.writeFilte('./dados/carrinho.json', JSON.stringify(carrinho, null, 2));

    res.status(201).json(carrinho);
}

module.exports = {
    obterCarrinho,
};