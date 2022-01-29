require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  logging: false,
});

const db = {
  Tag: sequelize.define(
    'tag',
    {
      name: Sequelize.STRING,
      category: Sequelize.STRING,
      frequency: Sequelize.INTEGER,
    },
    {
      indexes: [{ unique: true, fields: ['name'] }],
    }
  ),
  RecipesTag: sequelize.define(
    'recipes_tag',
    {
      recipe_id: Sequelize.INTEGER,
      tag_id: Sequelize.INTEGER,
    },
    {
      indexes: [{ fields: ['recipe_id'] }, { fields: ['tag_id'] }],
    }
  ),
  Ingredient: sequelize.define('ingredient', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    category: Sequelize.STRING,
    frequency: Sequelize.INTEGER,
  }),
  RecipesIngredient: sequelize.define(
    'recipes_ingredient',
    {
      recipe_id: Sequelize.INTEGER,
      ingredient_id: Sequelize.INTEGER,
    },
    {
      indexes: [{ fields: ['recipe_id'] }, { fields: ['ingredient_id'] }],
    }
  ),
  Recipe: sequelize.define('recipe', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    aggregateLikes: Sequelize.INTEGER,
    summary: Sequelize.TEXT,
    readyInMinutes: Sequelize.INTEGER,
    servings: Sequelize.INTEGER,
    image: Sequelize.STRING,
    pricePerServing: Sequelize.FLOAT,
    sourceName: Sequelize.STRING,
    sourceUrl: Sequelize.STRING,
    ingredients: Sequelize.JSON,
    instructionSections: Sequelize.INTEGER,
    instructions: Sequelize.JSON,
    tags: Sequelize.JSON,
  }),
  initialize: async () => {
    await db.Recipe.sync({ force: true });
    await db.Ingredient.sync({ force: true });
    await db.RecipesIngredient.sync({ force: true });
    await db.Tag.sync({ force: true });
    await db.RecipesTag.sync({ force: true });
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
