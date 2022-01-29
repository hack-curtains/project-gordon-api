const express = require('express');
const port = process.env.PORT || 3000;
const { data, ingredients, cuisines, dishTypes, diets } = require('./data');

const {
  getRecipes,
  getRecipe,
  getRecipesByIngredients,
  getRecipesByTags,
  filterRecipesByIngredients,
  filterRecipesByTags,
} = require('../models/recipes.js');

const { getIngredients } = require('../models/ingredients.js');
const { getTags } = require('../models/tags.js');

const app = express();
app.use(express.json());
app.use(express.static('docs'));

app.get('/recipes', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 10;
  let data = await getRecipes({ page, count });
  res.json(data);
});

app.get('/recipes/:id', async (req, res) => {
  const id = req.params.id;
  let data = await getRecipe({ id });
  res.json(data);
});

app.get('/tags', async (req, res) => {
  let data = await getTags();
  res.json(data);
});

app.get('/ingredients', async (req, res) => {
  let data = await getIngredients();
  res.json(data);
});

app.get('/search/:ids/ingredients', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const ingredients = req.params.ids ? req.params.ids.split(',') : [];
  let data = await getRecipesByIngredients({ ids: ingredients, page: page, count: count });
  res.json(data);
});

app.get('/search/:ids/tags', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const tags = req.params.ids ? req.params.ids.split(',') : [];
  let data = await getRecipesByTags({ ids: tags, page: page, count: count });
  res.json(data);
});

app.get('/filter/:ids/ingredients', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const ingredients = req.params.ids ? req.params.ids.split(',') : [];
  let data = await filterRecipesByIngredients({ ids: ingredients, page: page, count: count });
  res.json(data);
});

app.get('/filter/:ids/tags', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const tags = req.params.ids ? req.params.ids.split(',') : [];
  let data = await filterRecipesByTags({ ids: tags, page: page, count: count });
  res.json(data);
});

app.listen(port, async () => {
  console.log('Server is running at http://localhost:' + port);
});
