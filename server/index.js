const express = require('express');
const port = process.env.PORT || 3000;
const { data } = require('./data');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

app.get('/recipes', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
