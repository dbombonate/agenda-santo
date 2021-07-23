const express = require('express');
// const bodyParser = require('body-parser');
const { json, urlencoded } = require('express');

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

require('./controllers/usersController')(app);
require('./controllers/groupsController')(app);

app.listen(3030, () => {
  console.log('Server is UP.');
});
