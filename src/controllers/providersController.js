const express = require('express');
const Provider = require('../models/Provider');

const router = express.Router();

// Rota para listar Fornecedores
router.get('/', (req, res) => res.send({ message: 'GET Providers' }));

// Rota para criar Fornecedores
router.post('/register', (req, res) => res.send({ message: 'POST Providers' }));

// Rota para apagar Fornecedores
router.delete('/:id', (req, res) => res.send({ message: `DELETE Provider ID: ${req.params.id}` }));

module.exports = (app) => app.use('/providers', router);
