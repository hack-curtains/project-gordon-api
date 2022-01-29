const express = require('express');
const port = process.env.PORT || 3000;
const { data, ingredients, cuisines, dishTypes, diets } = require('./data');

const {
  getRecipes,
  getRecipe,
  getRecipesByIngredients,
  getRecipesByTags,
} = require('../models/recipes.js');

const { getIngredients } = require('../models/ingredients.js');
const { getTags } = require('../models/tags.js');

const app = express();
app.use(express.json());

let dbStats = {};

app.get('/api', (req, res) => {
  let html = `
    <h1>Recipes API</h1>
    <p><span style='background-color: #ffcc33'>/recipes</span> - returns a list of recipes, defaults: <b>?page=1&count=10'</b></p>
    <p><span style='background-color: #ffcc33'>/recipes/:id</span> - returns a single recipe, <b>default id=1'</b></p>
    <p><span style='background-color: #ffcc33'>/ingredients</span> - returns an array of all unique incredients</p>
    <p><span style='background-color: #ffcc33'>/search</span> - returns recipes that contain ingredients <b>?page=1&count=10&ingredients=flour,sugar,milk</b></p>
    <p><span style='background-color: #ffcc33'>/tags</span> - returns an object that enumerates all tags</p>
    `;
  res.send(html);
  // res.json({ '/recipes': 'returns a list of recipes, defaults: ?page=1&count=10', '/recipes/:id': 'returns a recipe ' });
});

app.get('/api/stats', async (req, res) => {
  res.json(dbStats);
});

app.get('/api/recipes', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 10;
  let data = await getRecipes({ page, count });
  res.json(data);
});

app.get('/api/recipes/:id', async (req, res) => {
  const id = req.params.id;
  let data = await getRecipe({ id });
  res.json(data);
});

app.get('/api/tags', async (req, res) => {
  let data = await getTags();
  res.json(data);
});

app.get('/api/ingredients', async (req, res) => {
  let data = await getIngredients();
  res.json(data);
});

app.get('/api/search/', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const ingredients = req.query.ingredients ? req.query.ingredients.split(',') : [];
  let data = await getRecipesByIngredients({ ids: ingredients, page: page, count: count });
  res.json(data);
});

app.get('/api/filter/', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  let data = await getRecipesByTags({ ids: tags, page: page, count: count });
  res.json(data);
});

app.listen(port, async () => {
  console.log('Server is running at http://localhost:' + port);
});
