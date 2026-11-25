const express = require('express');
const router = express.Router();
const Movimentacao = require('../models/Movimentacao');

// LISTAR
router.get('/', async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.find();
        res.json(movimentacoes);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// CADASTRAR
router.post('/', async (req, res) => {
    try {
        const movimentacao = await Movimentacao.create(req.body);
        res.status(201).json(movimentacao);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// ATUALIZAR
router.put('/:id', async (req, res) => {
    try {
        const movimentacao = await Movimentacao.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movimentacao) {
            return res.status(404).json({ erro: 'Não encontrada' });
        }

        res.json(movimentacao);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// EXCLUIR
router.delete('/:id', async (req, res) => {
    try {
        const movimentacao = await Movimentacao.findByIdAndDelete(
            req.params.id
        );

        if (!movimentacao) {
            return res.status(404).json({ erro: 'Não encontrada' });
        }

        res.json({ message: 'Movimentação excluída!' });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

module.exports = router;