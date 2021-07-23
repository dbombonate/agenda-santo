const express = require('express');
const validator = require('validator');

const User = require('../models/User');
const Group = require('../models/Group');

const router = express.Router();

// Rota para listar usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('group', 'name');

    // Validação de usuários cadastrados.
    if (users.length === 0) return res.status(400).send({ alert: 'There are no users registry.' });

    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate('group', 'name');
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Rota para adicionar usuários
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Checagem de dados da requisição
    if (!validator.isEmail(email)) return res.status(400).send({ error: 'Invalid email.' });
    if (name.length === 0) return res.status(400).send({ error: 'Invalid name.' });
    if (password.length === 0) return res.status(400).send({ error: 'Invalid password.' });
    if (password.length < 6) return res.status(400).send({ error: 'Password must have 6 or more characters' });

    // Checagem se email já está cadastrado
    const userExists = await User.findOne({ email }).exec();
    if (userExists) return res.status(400).send({ error: 'Email already in use.' });

    // Busca o Grupo Padrão para incluir no req.body
    const groupId = await Group.findOne({ isDefault: true }).exec();
    // eslint-disable-next-line no-underscore-dangle
    const userWithGroup = { ...req.body, group: groupId._id };
    // Cria o usuário e exibe no retorno.
    const user = await User.create(userWithGroup);
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ error: 'Error on registration.' });
  }
});

// Rota de edição de usuários
router.put('/:id', async (req, res) => res.send('Rota de edição de usuário.'));

// Rota para deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOne({ _id: req.params.id }).exec();
    if (!deletedUser) { return res.send({ error: 'Incorrect ID' }); }
    await User.deleteOne({ _id: req.params.id });
    if (deletedUser.deletedCount === 0) { return res.send({ alert: 'No user deleted' }); }
    return res.status(200).send({ deletedUser });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

module.exports = (app) => app.use('/users', router);
