const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const crypto = require('crypto');

const recipesController = require('../controllers/recipes.js');
const tagsController = require('../controllers/tags.js');
const ingredientsController = require('../controllers/ingredients.js');
const searchController = require('../controllers/search.js');
const filterController = require('../controllers/filter.js');
const usersController = require('../controllers/users.js');
const logsController = require('../controllers/logs.js');
const matchController = require('../controllers/match.js');
const authController = require('../controllers/authentication.js');
const cache = require('./cache.js');
const logger = require('./logger.js');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  sessions({
    secret: 'secretkeythatwouldbehiddeninproductionenvironment',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

//only cache and log in production
if (process.env.NODE_ENV === 'prod') {
  app.use(/\/((?!logs).)*/, logger);
  app.use(cache);
}

//static logs
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
app.get('/match/ingredients', matchController.matchIngredients);

// User Routes
app.post('/users/:user_id/ingredients/:ingredient_id/add', usersController.addIngredient);
app.put('/users/:user_id/ingredients/:ingredient_id/remove', usersController.removeIngredient);
app.get('/users/:user_id/ingredients', usersController.getIngredients);
app.post('/users/:user_id/recipes/:recipe_id/add', usersController.addRecipe);
app.put('/users/:user_id/recipes/:recipe_id/remove', usersController.removeRecipe);
app.get('/users/:user_id/recipes', usersController.getRecipes);

// Authentication Routes
// User Authentication
app.get('/newSession', authController.createSession);
app.post('/users/new', authController.newUser);
app.post('/users/login', authController.loginUser);
app.put('/users/logout', authController.logoutUser);

//Cache Routes
app.get('/logs', logsController);

module.exports = app;
