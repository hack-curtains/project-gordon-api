const fs = require('fs/promises');
const { db } = require('./index.js');

const INSERTED = {};
const INGREDIENTS = {};

const main = async () => {
  await db.Recipe.sync({ force: true });

  let files = await fs.readdir(__dirname + '/rawdata');

  for (let i = 0; i < files.length; i++) {
    console.log(i, 'of', files.length, 'reading', files[i]);
    let data = await fs.readFile(__dirname + '/rawdata/' + files[i]);
    let json = JSON.parse(data);

    for (let r = 0; r < json.recipes.length; r++) {
      let rec = json.recipes[r];
      if (INSERTED[rec.id]) continue;

      let recipe = {
        recipe_id: rec.id,
        title: rec.title,
        summary: rec.summary,
        readyInMinutes: rec.readyInMinutes,
        servings: rec.servings,
        image: rec.image,
        pricePerServing: rec.pricePerServing,
        sourceName: rec.sourceName,
        ingredients: rec.extendedIngredients.map((ing) => {
          return { name: ing.name, original: ing.original };
        }),
        instructionSections: rec.analyzedInstructions.length,
        instructions: rec.analyzedInstructions.map((x) => {
          return { name: x.name, steps: x.steps.map((s) => s.step) };
        }),
        cuisines: rec.cuisines,
        dishTypes: rec.dishTypes,
        diets: rec.diets,
      };

      await db.Recipe.create(recipe);

      INSERTED[rec.id] = true;
    }
  }

  db.close();
};

main();
