const express = require('express');
const validator = require('validator');

const User = require('../models/User');

const router = express.Router();

// Rota para listar usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) return res.status(400).send({ alert: 'There are no users registry.' });

    return res.status(200).send(users);
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

    // Cria o usuário e exibe no retorno.
    const user = await User.create(req.body);
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Deu erro' });
  }
});

// Rota de edição de usuários
router.get('/:id', async (req, res) => res.send('Rota de edição de usuário.'));

// Rota para deletar usuário
router.delete('/:id', (req, res) => {
  res.send('Rota para apagar usuário.');
});

module.exports = (app) => app.use('/users', router);
