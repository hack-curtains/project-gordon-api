const { getRecipes, getRecipe } = require('../models/recipes.js');

/******************************
 * Search by Ingredients
 *****************************/
module.exports.searchIngredients = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const ingredient_ids = (req.query.ids ? req.query.ids.split(',') : []).map((x) => parseInt(x));
    const sort = req.query.sort || 'default';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await getRecipes({ page, count, sort, direction, ingredient_ids });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};

/******************************
 * Search by Tag
 *****************************/
module.exports.searchTags = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const tag_ids = (req.query.ids ? req.query.ids.split(',') : []).map((x) => parseInt(x));
    const sort = req.query.sort || 'default';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    let data = await getRecipes({ page, count, sort, direction, tag_ids });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};

/******************************
 * Search General
 *****************************/
module.exports.search = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const tag_ids = (req.query.tag_ids ? req.query.tag_ids.split(',') : []).map((x) => parseInt(x));
    const ingredient_ids = (
      req.query.ingredient_ids ? req.query.ingredient_ids.split(',') : []
    ).map((x) => parseInt(x));
    const query = req.query.query || '';
    const sort = req.query.sort || 'default';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';

    let data = await getRecipes({ page, count, tag_ids, ingredient_ids, query, sort, direction });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};
