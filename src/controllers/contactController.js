const express = require('express');
const validator = require('validator');

const Contact = require('../models/Contact');
const Group = require('../models/Group');

const router = express.Router();

// Rota para listar Contatos
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({}).populate('providerId', 'name')
      .populate('groupId', 'name')
      .populate('userId', 'name');
    if (contacts.length === 0) return res.status(400).send({ alert: 'There are no contacts registry.' });
    return res.status(200).send({ contacts });
  } catch (error) {
    return res.status(400).send({ error: 'Error trying to list Contacts' });
  }
});

// Rota para listar Contatos por ID
router.get('/:id', async (req, res) => {
  try {
    const listedContact = await Contact.findOne({ _id: req.params.id });
    return res.status(200).send({ listedContact });
  } catch (error) {
    return res.status(400).send({ error: 'Invalid ID' });
  }
});

// Rota para criar Contatos
router.post('/register', async (req, res) => {
  const {
    name, providerId, phoneNumber, email, userId,
  } = req.body;
  let { groupId } = req.body;
  try {
    // Validações de campos enviados
    if (!name) return res.status(400).send({ alert: 'Name must be informed.' });
    if (!phoneNumber) return res.status(400).send({ alert: 'Principal phone number must be informed.' });
    if (!email || !validator.isEmail(email)) return res.status(400).send({ alert: 'Email must be informed and need to be valid.' });
    if (!providerId) return res.status(400).send({ alert: 'Provider must be informed.' });
    if (!userId) return res.status(400).send({ alert: 'User must be informed.' });
    if (!groupId) {
      const groupSelection = await Group.findOne({ isDefault: true }).exec();
      // eslint-disable-next-line no-underscore-dangle
      groupId = groupSelection._id;
    }
    const contact = { groupId, ...req.body };
    const saveContact = await Contact.create(contact);
    return res.status(200).send(saveContact);
  } catch (error) {
    return res.status(400).send({ error: 'Error trying to save contact' });
  }
});

// Rota para apagar Contatos
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findOne({ _id: req.params.id }).exec();
    if (!deletedContact) { return res.send({ error: 'Incorrect ID' }); }
    await Contact.deleteOne({ _id: req.params.id });
    if (deletedContact.deletedCount === 0) { return res.send({ alert: 'No contact deleted' }); }
    return res.status(200).send({ deletedContact });
  } catch (error) {
    return res.status(400).send({ erro: error });
  }
});

module.exports = (app) => app.use('/contacts', router);
