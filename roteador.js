const express = require('express');
const produtos = require('./controladores/produtos');
const { obterCarrinho } = require('./controladores/carrinho');

const roteador = express();

roteador.get("/produtos", produtos.consultarProdutosEstoque);
roteador.post("/carrinho", carrinho.obterCarrinho);

module.exports = roteador;