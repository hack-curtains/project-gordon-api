const { getRecipes } = require('../models/recipes.js');

/******************************
 * Match all ingredients in query
 * Returns only recipes whos ingredients are subsets
 * of the ids passed here
 *****************************/
module.exports.matchIngredients = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const count = parseInt(req.query.count || 10);
    const ingredient_ids = (req.query.ids ? req.query.ids.split(',') : []).map((x) => parseInt(x));
    const sort = req.query.sort || 'default';
    const direction = req.query.direction ? req.query.direction.toLowerCase() : 'asc';
    const exact = true;
    let data = await getRecipes({ page, count, sort, direction, ingredient_ids, exact });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};
