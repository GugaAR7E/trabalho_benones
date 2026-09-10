const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar vendas de combustível
app.post('/compraCarrinho', (req, res) => {
    const { roupa, preco, quantidade, data_compra } = req.body;

    const codigoDoMySQL = 'INSERT INTO adicione_ao_carrinho (roupa, preco, quantidade, data_compra) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [roupa, preco, quantidade, data_compra], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Venda de combustível cadastrada!' });
    });
});

// Listar vendas de combustível
app.get('/compraCarrinho', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM adicione_ao_carrinho';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

// Deletar venda de combustível
app.delete('/compraCarrinho/:id', (req, res) => {
    const id = req.params.id;
    const codigoDoMySQL = 'DELETE FROM adicione_ao_carrinho WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar compra' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Compra não encontrada' });
        }

        res.json({ message: 'Compra retirada com sucesso!' });
    });
});

// Atualizar venda de combustível
app.put('/compraCarrinho/:id', (req, res) => {
    const id = req.params.id;
    const { roupa, preco, quantidade, data_compra } = req.body;

    const codigoDoMySQL = 'UPDATE adicione_ao_carrinho SET roupa = ?, preco = ?, quantidade = ?, data_compra = ? WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [roupa, preco, quantidade, data_compra, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar carrinho' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Roupa não encontrada' });
        }

        res.json({ message: 'Carrinho atualizado com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
