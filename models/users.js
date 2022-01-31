const { pool, RECIPE_COLUMNS } = require('./index.js');

const ABBREVIATED_COLUMNS = RECIPE_COLUMNS.map((c) => 'r.' + c).join(', ');

module.exports.addIngredient = async ({ user_id, ingredient_id }) => {
  let SQL = `
    INSERT INTO users_ingredients(user_id, ingredient_id, "createdAt", "updatedAt")
    VALUES( ${user_id}, ${ingredient_id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )
    ON CONFLICT (user_id, ingredient_id)  DO
      UPDATE SET "updatedAt" = CURRENT_TIMESTAMP;
  `;
  await pool.query(SQL);
};

module.exports.getIngredients = async ({ user_id }) => {
  let SQL = `
    SELECT
      i.id, i.name, i.category,ui."createdAt" as date_added
    FROM users_ingredients ui
    LEFT JOIN ingredients i on ui.ingredient_id = i.id
    WHERE ui.user_id = ${user_id}
    ORDER BY i.id
  `;
  let data = await pool.query(SQL);
  return data.rows;
};

module.exports.removeIngredient = async ({ user_id, ingredient_id }) => {
  let SQL = `
    DELETE FROM users_ingredients
    WHERE user_id = ${user_id} AND ingredient_id = ${ingredient_id}
  `;
  await pool.query(SQL);
};

module.exports.addRecipe = async ({ user_id, recipe_id }) => {
  let SQL = `
    INSERT INTO users_recipes(user_id, recipe_id, "createdAt", "updatedAt")
    VALUES( ${user_id}, ${recipe_id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )
    ON CONFLICT (user_id, recipe_id)  DO
      UPDATE SET "updatedAt" = CURRENT_TIMESTAMP;
  `;
  await pool.query(SQL);
};

module.exports.getRecipes = async ({ user_id }) => {
  let SQL = `
    SELECT
      ${ABBREVIATED_COLUMNS},
      ur."createdAt" as date_added
    FROM users_recipes ur
    LEFT JOIN recipes r on ur.recipe_id = r.id
    WHERE ur.user_id = ${user_id}
    ORDER BY r.id
  `;
  let data = await pool.query(SQL);
  return data.rows;
};

module.exports.removeRecipe = async ({ user_id, recipe_id }) => {
  let SQL = `
    DELETE FROM users_recipes
    WHERE user_id = ${user_id} AND recipe_id = ${recipe_id}
  `;
  await pool.query(SQL);
};
