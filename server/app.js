const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recipesController = require('../controllers/recipes.js');
const tagsController = require('../controllers/tags.js');
const ingredientsController = require('../controllers/ingredients.js');
const searchController = require('../controllers/search.js');
const filterController = require('../controllers/filter.js');
const usersController = require('../controllers/users.js');
const logsController = require('../controllers/logs.js');
const cache = require('./cache.js');
const logger = require('./logger.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'prod') {
  app.use(/\/((?!logs).)*/, logger);
  app.use(cache);
}

app.use(express.static('docs'));

// Recipe Routes
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getRecipe);
app.get('/tags', tagsController.getTags);
app.get('/ingredients', ingredientsController.getIngredients);
app.get('/search/ingredients', searchController.searchIngredients);
app.get('/search/tags', searchController.searchTags);
app.get('/search', searchController.search);
app.get('/filter/ingredients', filterController.filterIngredients);
app.get('/filter/tags', filterController.filterTags);
app.get('/filter', filterController.filter);

// User Routes
app.post('/users/:user_id/ingredients/:ingredient_id/add', usersController.addIngredient);
app.put('/users/:user_id/ingredients/:ingredient_id/remove', usersController.removeIngredient);
app.get('/users/:user_id/ingredients', usersController.getIngredients);
app.post('/users/:user_id/recipes/:recipe_id/add', usersController.addRecipe);
app.put('/users/:user_id/recipes/:recipe_id/remove', usersController.removeRecipe);
app.get('/users/:user_id/recipes', usersController.getRecipes);

//Cache Routes
app.get('/logs', logsController);

module.exports = app;
