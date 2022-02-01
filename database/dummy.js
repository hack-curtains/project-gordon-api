const { db, sequelize } = require('./index.js');
const { getRecipes, getIngredients, addRecipe, addIngredient } = require('../models/users.js');

const main = async () => {
  let recipes = await sequelize.query('SELECT id from recipes order by ID ASC LIMIT 100');
  let recipe_ids = recipes[0].map((x) => x.id);

  let ingredients = await sequelize.query(
    'SELECT id from ingredients order by frequency DESC LIMIT 100'
  );
  let ingredient_ids = ingredients[0].map((x) => x.id);

  //users
  for (let user_id = 1000; user_id < 1050; user_id++) {
    //add 5-10 recipes to favorites
    for (let n = 0; n < 10; n++) {
      let r = Math.floor(Math.random() * 100);
      let recipe_id = recipe_ids[r];
      await addRecipe({ user_id, recipe_id });
    }

    //add 5-10 recipes to favorites
    for (let n = 0; n < 10; n++) {
      let r = Math.floor(Math.random() * 100);
      let ingredient_id = ingredient_ids[r];
      await addIngredient({ user_id, ingredient_id });
    }
  }

  await sequelize.close();
};

main();
