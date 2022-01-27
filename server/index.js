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

app.get('/recipes/:id', (req, res) => {
  let id = 1;
  if (req.params.id && req.params.id > 0 && req.params.id < 5) {
    id = req.params.id;
  }
  res.json(data[id - 1]);
});

app.get('/ingredients', (req, res) => {
  let ingredients = {};
  data.forEach((r) => {
    r.ingredients.forEach((i) => {
      ingredients[i.id] = i.name.toLowerCase();
    });
  });
  res.json(ingredients);
});

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
