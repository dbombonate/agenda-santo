const express = require('express');
const Provider = require('../models/Provider');

const router = express.Router();

// Rota para listar Fornecedores
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find({});
    if (providers.length === 0) return res.status(400).send({ alert: 'There are no providers to list' });
    return res.status(200).send(providers);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

// Rota para criar Fornecedores
router.post('/register', async (req, res) => {
  try {
    const { name } = req.body;
    // Valida se name está preenchido
    if (!name) return res.status(400).send({ error: 'Incorrect name, check the provider name' });
    // Valida se fornecedor já cadastrado
    const providerExists = await Provider.findOne({ name });
    if (providerExists) return res.status(400).send({ error: 'This provider already exists' });
    const provider = await Provider.create(req.body);

    return res.status(200).send({ provider });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

// Rota para apagar Fornecedores
router.delete('/:id', async (req, res) => {
  try {
    const deletedProvider = await Provider.findOne({ _id: req.params.id }).exec();
    if (!deletedProvider) { return res.send({ error: 'Incorrect ID' }); }
    await Provider.deleteOne({ _id: req.params.id });
    if (deletedProvider.deletedCount === 0) { return res.send({ alert: 'No provider deleted' }); }
    return res.status(200).send(deletedProvider);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const update = await Provider.findOneAndUpdate({ _id: id }, { name }, { new: true });
    return res.status(200).send({ update });
  } catch (error) {
    return res.status(400).send({ error });
  }
});
module.exports = (app) => app.use('/providers', router);
