require('dotenv').config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  logging: false,
});

const db = {
  User: sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    email: Sequelize.STRING,
  }),
  Session: sequelize.define('session', {
    user_id: Sequelize.INTEGER,
    cookie: Sequelize.STRING,
    expiration: Sequelize.DATE,
  }),
  UsersIngredient: sequelize.define(
    'users_ingredient',
    {
      user_id: Sequelize.INTEGER,
      ingredient_id: Sequelize.INTEGER,
    },
    {
      indexes: [
        {
          fields: ['ingredient_id'],
        },
      ],
    }
  ),
  UsersRecipe: sequelize.define(
    'users_recipe',
    {
      user_id: Sequelize.INTEGER,
      recipe_id: Sequelize.INTEGER,
    },
    {
      indexes: [
        {
          fields: ['recipe_id'],
        },
      ],
    }
  ),
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
        {
          name: 'title_index',
          fields: ['title'],
        },
      ],
    }
  ),
  initialize: async () => {
    await db.Recipe.sync({ force: true });
    await db.Ingredient.sync({ force: true });
    await db.Tag.sync({ force: true });
    await db.UsersIngredient.sync({ force: true });
    await db.UsersRecipe.sync({ force: true });
    await db.User.sync({ force: true });
    await db.Session.sync({ force: true });

    await sequelize.query('CREATE INDEX recipes_tag_ids_index ON recipes USING gin (tag_ids);');
    await sequelize.query(
      'CREATE INDEX recipes_ingredients_index ON recipes USING gin (ingredient_ids);'
    );
    await sequelize.query('ALTER TABLE users_recipes ADD UNIQUE (user_id, recipe_id);');
    await sequelize.query('ALTER TABLE users_ingredients ADD UNIQUE (user_id, ingredient_id);');
    await sequelize.query(
      'ALTER TABLE users_ingredients ADD CONSTRAINT users_ingredients_fk FOREIGN KEY (ingredient_id) REFERENCES ingredients (id);'
    );
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
