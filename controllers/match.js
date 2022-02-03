const { matchRecipes } = require('../models/recipes.js');

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
    const query = req.query.query || '';

    let data = await matchRecipes({ page, count, ingredient_ids, query });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};
