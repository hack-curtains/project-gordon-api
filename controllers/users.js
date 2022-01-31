const {
  addIngredient,
  getIngredients,
  removeIngredient,
  addRecipe,
  getRecipes,
  removeRecipe,
} = require('../models/users.js');

const validate = (num) => num && num > 0 && Number.isInteger(num);

//post
module.exports.addIngredient = async (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const ingredient_id = parseInt(req.params.ingredient_id);

  if (!validate(user_id) || !validate(ingredient_id)) {
    res.status(422).json({ message: 'user_id and ingredient_id must be positive integers' });
  } else {
    try {
      await addIngredient({ user_id, ingredient_id });
      res.status(200).json({ message: 'recipe added successfully' });
    } catch (err) {
      res.status(500).json({ message: 'error connecting to database' });
    }
  }
};

module.exports.getIngredients = async (req, res) => {
  const user_id = parseInt(req.body.user_id);

  if (!validate(user_id)) {
    res.status(422).json({ message: 'user_id must be a positive integers' });
  } else {
    try {
      let data = await getIngredients({ user_id });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'error connecting to database' });
    }
  }
};

module.exports.removeIngredient = async (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const ingredient_id = parseInt(req.params.ingredient_id);

  if (!validate(user_id) || !validate(ingredient_id)) {
    res.status(422).json({ message: 'user_id and ingredient_id must be positive integers' });
  } else {
    try {
      await removeIngredient({ user_id, ingredient_id });
      res.status(200).json({ message: 'ingredient removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'error connecting to database' });
    }
  }
};

//post
module.exports.addRecipe = async (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const recipe_id = parseInt(req.params.recipe_id);

  if (!validate(user_id) || !validate(recipe_id)) {
    res.status(422).json({ message: 'user_id and recipe_id must be positive integers' });
  } else {
    try {
      await addRecipe({ user_id, recipe_id });
      res.status(200).json({ message: 'recipe added to favorites successfully' });
    } catch (err) {
      res.status(500).json({ message: 'error connecting to database' });
    }
  }
};

module.exports.getRecipes = async (req, res) => {
  const user_id = parseInt(req.body.user_id);

  if (!validate(user_id)) {
    res.status(422).json({ message: 'user_id must be a positive integers' });
  } else {
    try {
      let data = await getRecipes({ user_id });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'error connecting to database' });
    }
  }
};

module.exports.removeRecipe = async (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const recipe_id = parseInt(req.params.recipe_id);

  if (!validate(user_id) || !validate(recipe_id)) {
    res.status(422).json({ message: 'user_id and recipe_id must be positive integers' });
  } else {
    try {
      await removeRecipe({ user_id, recipe_id });
      res.status(200).json({ message: 'ingredient removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'error connecting to database' });
    }
  }
};
