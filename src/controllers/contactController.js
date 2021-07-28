const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Rota para listar Contatos
router.get('/', (req, res) => res.send({ message: 'GET Contacts' }));

// Rota para criar Contatos
router.post('/register', (req, res) => res.send({ message: 'POST Contacts' }));

// Rota para apagar Contatos
router.delete('/:id', (req, res) => res.send({ message: `DELETE Contact ID: ${req.params.id}` }));

module.exports = (app) => app.use('/contacts', router);
