const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const movimentacoesRoutes = require('./routes/movimentacoes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API do gestor financeiro funcionando!' });
});

app.use('/movimentacoes', movimentacoesRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((erro) => {
        console.error('Erro ao conectar:', erro.message);
    });