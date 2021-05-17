const fs = require("fs");
const listaDeProdutos = require('../data.json');

const conteudo = fs.readFileSync("./data.json").toString();
const dados = JSON.parse(conteudo);

function consultarProdutosEstoque(req, res) {
    let categoria = req.query.categoria;
    let precoInicial = req.query.precoInicial;
    let precoFinal = req.query.precoFinal;

    if(categoria) {
        const produtosPorCategoria = dados.produtos.filter((produto) => {
            return produto.categoria == req.query.categoria && produto.estoque > 0;
        });
        res.json(produtosPorCategoria);
    };

    if(precoInicial && precoFinal){
        const faixaPreco = dados.produtos.filter((produto) => {
         return produto.preco >= precoInicial && produto.preco <= precoFinal && produto.estoque > 0;
        });
        res.json(faixaPreco);
    };

    if(precoInicial && precoFinal && categoria){
        const faixaDePreco = dados.produtos.filter((produto) => {
            return produto.preco >= precoInicial && produto.preco <= precoFinal;
        });
        const faixaDePrecoECategoria = faixaDePreco.filter((produto) => {
            return produto.categoria == req.query.categoria && produto.estoque > 0;
        });
        res.json(faixaDePrecoECategoria);
    };
};

module.exports = {
    consultarProdutosEstoque,
};