const express = require('express');

const Group = require('../models/Group');

const router = express.Router();

// Rota de Listagem dos Grupos
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find({});

    if (groups.length === 0) return res.status(400).send({ alert: 'There are no groups registry.' });

    return res.status(200).send(groups);
  } catch (err) {
    return res.status(400).send({ error: 'Error trying to list Groups' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, isDefault } = req.body;

    // Checagem de campos
    if (!name) return res.status(400).send({ error: 'Check name field.' });

    // Checagem de mais de um grupo Padrão
    const defaultExists = await Group.findOne({ isDefault }).exec();
    if (defaultExists) return res.status(400).send({ error: 'Default group already exists.' });

    const group = await Group.create(req.body);
    return res.status(200).send({ group });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

router.delete('/:id', async (req, res) => {

});

module.exports = (app) => app.use('/groups', router);
