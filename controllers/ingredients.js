const { getIngredients } = require('../models/ingredients.js');

/******************************
 * Get Ingredients
 *****************************/
module.exports.getIngredients = async (req, res) => {
  try {
    let data = await getIngredients();
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};
