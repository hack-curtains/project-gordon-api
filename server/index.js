const app = require('./app');
const port = process.env.PORT || 3000;

<<<<<<< HEAD
const { getRecipes, getRecipe } = require('../models/recipes.js');

const recipesController = require('../controllers/recipes.js');
const tagsController = require('../controllers/tags.js');
const ingredientsController = require('../controllers/ingredients.js');
const searchController = require('../controllers/search.js');
const filterController = require('../controllers/filter.js');
const usersController = require('../controllers/users.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('docs'));

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

app.post('/users/ingredients/:ingredient_id/add', usersController.addIngredient);
app.post('/users/ingredients/', usersController.getIngredients);
app.put('/users/ingredients/:ingredient_id/remove', usersController.removeIngredient);

app.post('/users/recipes/:recipe_id/add', usersController.addRecipe);
app.post('/users/recipes/', usersController.getRecipes);
app.put('/users/recipes/:recipe_id/remove', usersController.removeRecipe);

app.listen(port, async () => {
  console.log('Server is running at http://localhost:' + port);
});
=======
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
>>>>>>> source/main
