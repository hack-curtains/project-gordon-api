const fs = require('fs/promises');
const { db } = require('./index.js');

const main = async () => {
  await db.Recipe.sync({ force: true });

  let files = await fs.readdir(__dirname + '/rawdata');

  for (let i = 0; i < files.length; i++) {
    let data = await fs.readFile(__dirname + '/rawdata/' + files[i]);
    let json = JSON.parse(data);

    for (let r = 0; r < json.recipes.length; r++) {
      let recipe = json.recipes[r];
      let obj = {
        recipe_id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
      };
      try {
        await db.Recipe.create(obj);
      } catch (err) {
        console.log(err);
      }
    }
  }

  db.close();
};

main();
