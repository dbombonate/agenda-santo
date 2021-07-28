const { response } = require('express');
const apiProvider = require('../clients/apiProvider');

const requisition = apiProvider.get('https://erp.bluesoft.com.br/santo/api/fornecedores')
  .then((response) => (response.data))
  .catch((err) => {
    console.log('Deu erro', err);
  });

module.exports = requisition;
