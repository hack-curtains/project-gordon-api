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
  try {
    const page = req.query.page || 1;
    const count = req.query.count || 10;
    const sort = req.query.sort ? req.query.sort.toLowerCase() : 'id';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await getRecipes({ page, count, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = await getRecipe({ id });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/tags', async (req, res) => {
  try {
    let data = await getTags();
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/ingredients', async (req, res) => {
  try {
    let data = await getIngredients();
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/search/ingredients', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    const sort = req.query.sort ? req.query.sort.toLowerCase() : 'id';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await getRecipesByIngredients({ ids, page, count, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/search/tags', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    const sort = req.query.sort ? req.query.sort.toLowerCase() : 'id';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await getRecipesByTags({ ids, page, count, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/filter/ingredients', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    const sort = req.query.sort ? req.query.sort.toLowerCase() : 'id';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await filterRecipesByIngredients({ ids, page, count, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

app.get('/filter/tags', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    const sort = req.query.sort ? req.query.sort.toLowerCase() : 'id';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await filterRecipesByTags({ ids, page, count, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
});

