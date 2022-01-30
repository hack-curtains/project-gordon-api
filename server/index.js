const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
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
app.use(cors());
app.use(express.json());
app.use(express.static('docs'));

app.get('/recipes', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 10;
  const sort = req.query.sort ? req.query.sort.toLowerCase() : 'id';
  const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
  let data = await getRecipes({ page, count, sort, direction });
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

app.get('/search/ingredients/:ids', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const ingredients = req.params.ids ? req.params.ids.split(',') : [];
  let data = await getRecipesByIngredients({ ids: ingredients, page: page, count: count });
  res.json(data);
});

app.get('/search/tags/:ids', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const tags = req.params.ids ? req.params.ids.split(',') : [];
  let data = await getRecipesByTags({ ids: tags, page: page, count: count });
  res.json(data);
});

app.get('/filter/ingredients/:ids', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const ingredients = req.params.ids ? req.params.ids.split(',') : [];
  let data = await filterRecipesByIngredients({ ids: ingredients, page: page, count: count });
  res.json(data);
});

app.get('/filter/tags/:ids', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const count = parseInt(req.query.count || 10);
  const tags = req.params.ids ? req.params.ids.split(',') : [];
  let data = await filterRecipesByTags({ ids: tags, page: page, count: count });
  res.json(data);
});

app.listen(port, async () => {
  console.log('Server is running at http://localhost:' + port);
});
