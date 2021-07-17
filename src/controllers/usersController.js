const express = require('express');

const User = require('../models/User');

const router = express.Router();

// Rota para listar usuários
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) return res.status(400).send({ alert: There are no users to exibit});

    return res.status(200).send(users);
  } catch (err) {

  }
});
