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



const { createUser, loginUser } = require('../models/userAuth.js');
const { togglePantryItem, getPantry } = require('../models/userPantry.js');
const { toggleFavoriteRecipe, getFavorites } = require('../models/userFavs.js');

// post(/users/new) username, password, email
app.post('/users/new', async (req, res) => {
  const username = (req.query.username);
  const password = cypto.pbkdf2(req.query.password);
  const email = (req.query.email);



  // Prints derivedKey
  console.log(derivedKey.toString('hex'));
});
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
