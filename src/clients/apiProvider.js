const axios = require('axios');

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyTmFtZVwiOlwiZGFuaWVsLmJvbWJvbmF0ZVwiLFwic2VjcmV0XCI6XCJkSFV2QkNyd3FOZU9uak1VdUFqUFd4em5xYnJMbnhJR0ZIZmpRaHhLb2xcIn0ifQ.hyXPSL7BtGMFwdLCxSG6033G_-Tc3ETczo-Fv9RtYbMiDPS9X0yrt_GHa1L718TL9WyPhHyCZQgYq9V3HQcSdg';

// Cria rota para fazer requisições na Bluesoft no endereço

const apiProvider = axios.create({
  baseUrl: 'https://erp.bluesoft.com.br/santo/api/fornecedores',
});

apiProvider.defaults.headers.common['x-customtoken'] = `${token}`;

module.exports = apiProvider;
