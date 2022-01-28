require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  logging: false,
});

const db = {
  Recipe: sequelize.define(
    'recipe',
    {
      recipe_id: Sequelize.INTEGER,
      title: Sequelize.STRING,
      summary: Sequelize.TEXT,
      readyInMinutes: Sequelize.INTEGER,
      servings: Sequelize.INTEGER,
      image: Sequelize.STRING,
      pricePerServing: Sequelize.FLOAT,
      sourceName: Sequelize.STRING,
      ingredients: Sequelize.JSON,
      instructionSections: Sequelize.INTEGER,
      instructions: Sequelize.JSON,
      cuisines: Sequelize.JSON,
      dishTypes: Sequelize.JSON,
      diets: Sequelize.JSON,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['recipe_id'],
        },
      ],
    }
  ),
  initialize: async () => {
    await db.Recipe.sync({ force: true });
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
