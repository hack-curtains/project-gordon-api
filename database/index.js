require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  logging: false,
});

const db = {
  Tag: sequelize.define('tag', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    category: Sequelize.STRING,
    frequency: Sequelize.INTEGER,
  }),
  Ingredient: sequelize.define('ingredient', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    category: Sequelize.STRING,
    frequency: Sequelize.INTEGER,
  }),
  Recipe: sequelize.define(
    'recipe',
    {
      title: Sequelize.STRING,
      likes: Sequelize.INTEGER,
      summary: Sequelize.TEXT,
      time: Sequelize.INTEGER,
      servings: Sequelize.INTEGER,
      image: Sequelize.STRING,
      price: Sequelize.FLOAT,
      source_name: Sequelize.STRING,
      source_url: Sequelize.STRING,
      ingredients: Sequelize.JSONB,
      sections: Sequelize.INTEGER,
      instructions: Sequelize.JSONB,
      tags: Sequelize.JSONB,
      tag_ids: Sequelize.ARRAY(Sequelize.INTEGER),
      ingredient_ids: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    {
      indexes: [
        {
          name: 'likes_index',
          using: 'BTREE',
          fields: ['likes'],
        },
        {
          name: 'price_index',
          using: 'BTREE',
          fields: ['price'],
        },
      ],
    }
  ),
  initialize: async () => {
    await db.Recipe.sync({ force: true });
    await db.Ingredient.sync({ force: true });
    await db.Tag.sync({ force: true });

    await sequelize.query('CREATE INDEX recipes_tag_ids_index ON recipes USING gin (tag_ids);');
    await sequelize.query(
      'CREATE INDEX recipes_ingredients_index ON recipes USING gin (ingredient_ids);'
    );
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
