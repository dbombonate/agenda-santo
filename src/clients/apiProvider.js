const axios = require('axios');

import('dotenv/config');

const token = process.env.TOKEN_BS;

// Cria rota para fazer requisições na Bluesoft no endereço

const apiProvider = axios.create({
  baseUrl: 'https://erp.bluesoft.com.br/santo/api/fornecedores',
});

apiProvider.defaults.headers.common['x-customtoken'] = `${token}`;

module.exports = apiProvider;
