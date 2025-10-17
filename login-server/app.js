const express = require('express');
const routes = require('./api/index');

const app = express();

// middleware
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hola mundo');
});


module.exports = app;
