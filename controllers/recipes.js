const { getRecipes, getRecipe } = require('../models/recipes.js');

/******************************
 * Get Recipes
 *****************************/
module.exports.getRecipes = async (req, res) => {
  console.log(req.path);
  try {
    const page = req.query.page || 1;
    const count = req.query.count || 10;
    const sort = req.query.sort || 'default';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await getRecipes({ page, count, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};

/******************************
 * Get Recipe
 *****************************/
module.exports.getRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await getRecipe({ id });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};
