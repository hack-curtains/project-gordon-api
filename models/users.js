const { POOL, RECIPE_COLUMNS } = require('./index.js');

const ABBREVIATED_COLUMNS = RECIPE_COLUMNS.map((c) => 'r.' + c).join(', ');

/*****************************************
 * Add Ingredients
 *****************************************/
module.exports.addIngredient = async ({ user_id, ingredient_id }) => {
  let SQL = `
    SELECT * FROM users_ingredients
    WHERE user_id = ${user_id} AND ingredient_id = ${ingredient_id};
    INSERT INTO users_ingredients(user_id, ingredient_id, "createdAt", "updatedAt")
    VALUES( ${user_id}, ${ingredient_id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )
    ON CONFLICT (user_id, ingredient_id)  DO
      UPDATE SET "updatedAt" = CURRENT_TIMESTAMP;
  `;
  let data = await POOL.query(SQL);
  let rows = await getIngredients({ user_id });
  return {
    update: data[0].rows.length > 0 ? true : false,
    data: rows,
  };
};

/*****************************************
 * Remove Ingredients
 *****************************************/
module.exports.removeIngredient = async ({ user_id, ingredient_id }) => {
  let SQL = `
    SELECT * FROM users_ingredients
    WHERE user_id = ${user_id} AND ingredient_id = ${ingredient_id};
    DELETE FROM users_ingredients
    WHERE user_id = ${user_id} AND ingredient_id = ${ingredient_id};
  `;
  let data = await POOL.query(SQL);
  let rows = await getIngredients({ user_id });
  return {
    found: data[0].rows.length > 0 ? true : false,
    data: rows,
  };
};

/*****************************************
 * Get Ingredients
 *****************************************/
const getIngredients = async ({ user_id }) => {
  let SQL = `
    SELECT
      i.id, i.name, i.category,
      ui."createdAt" as date_added, ui."updatedAt" as date_updated
    FROM users_ingredients ui
    LEFT JOIN ingredients i on ui.ingredient_id = i.id
    WHERE ui.user_id = ${user_id}
    ORDER BY i.id
  `;
  let data = await POOL.query(SQL);
  return data.rows;
};

module.exports.getIngredients = getIngredients;

/*****************************************
 * Add Recipe
 *****************************************/
module.exports.addRecipe = async ({ user_id, recipe_id }) => {
  let SQL = `
    SELECT * FROM users_recipes
    WHERE user_id = ${user_id} AND recipe_id = ${recipe_id};
    INSERT INTO users_recipes(user_id, recipe_id, "createdAt", "updatedAt")
    VALUES( ${user_id}, ${recipe_id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )
    ON CONFLICT (user_id, recipe_id)  DO
      UPDATE SET "updatedAt" = CURRENT_TIMESTAMP;
  `;
  let data = await POOL.query(SQL);
  let rows = await getRecipes({ user_id });
  return {
    update: data[0].rows.length > 0 ? true : false,
    data: rows,
  };
};

/*****************************************
 * Remove Recipe
 *****************************************/
module.exports.removeRecipe = async ({ user_id, recipe_id }) => {
  let SQL = `
    SELECT * FROM users_recipes
    WHERE user_id = ${user_id} AND recipe_id = ${recipe_id};
    DELETE FROM users_recipes
    WHERE user_id = ${user_id} AND recipe_id = ${recipe_id};
  `;
  let data = await POOL.query(SQL);
  let rows = await getRecipes({ user_id });
  return {
    found: data[0].rows.length > 0 ? true : false,
    data: rows,
  };
};

/*****************************************
 * Get Recipes
 *****************************************/
const getRecipes = async ({ user_id }) => {
  let SQL = `
    SELECT
      ${ABBREVIATED_COLUMNS},
      ur."createdAt" as date_added, ur."updatedAt" as date_updated
    FROM users_recipes ur
    LEFT JOIN recipes r on ur.recipe_id = r.id
    WHERE ur.user_id = ${user_id}
    ORDER BY r.id
  `;
  let data = await POOL.query(SQL);
  return data.rows;
};

module.exports.getRecipes = getRecipes;
