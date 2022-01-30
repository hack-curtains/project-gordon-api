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


// post(/users/new) username, password, email
app.post('/users/new', async (req, res) => {
  // create a user in the database

  // initiate new session given the new user information
  // .next() to login
})

// post(/users/login) username, password
app.post('/users/login', async (req, res) => {
  // attempt to authenticate/login

  // create cookie/session if success

  // return reason for failure if failure
});


// put(/users/logout)
app.put('/users/logout', async (req, res) => {
  // end user session

});

// get(/users/:ID/favorites)
app.get('/users/:ID/favorites', async (req, res) => {
  // returns array of favorite recipe id's


});


// put(/users/:ID/favorites/:recipeID)
app.put('/users/:ID/favorites/:recipeID', async (req, res) => {
  // toggle favorite at ID

});

// get(/users/:ID/ingredients/)
app.get('/users/:ID/ingredients/', async (req, res) => {
  // returns array of pantry ingredient id's

})


// put(/users/:ID/ingredients/:ingredientID)
app.put('/users/:ID/ingredients/:ingredientID', async (req, res) => {
  // toggle ingredient at ID

})



app.listen(port, async () => {
  console.log('Server is running at http://localhost:' + port);
});
