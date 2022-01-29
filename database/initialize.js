const fs = require('fs/promises');
const { cuisines } = require('../server/data.js');
const { db } = require('./index.js');

let INGREDIENTS = {};
let TAGS = {};

const main = async () => {
  /**********************
   * INITIALIZE DB
   ***********************/
  await db.initialize();

  /**********************
   * POPULATE RECIPES TABLE
   ***********************/
  console.log('POPULATING RECIPES...');

  let files = await fs.readdir(__dirname + '/rawdata/json');
  files.sort(
    (a, b) => parseInt(a.substr(0, a.indexOf('.'))) - parseInt(b.substr(0, b.indexOf('.')))
  );

  for (let i = 0; i < files.length; i++) {
    let data = await fs.readFile(__dirname + '/rawdata/json/' + files[i]);
    let json = JSON.parse(data);

    for (let r = 0; r < json.length; r++) {
      let rec = json[r];

      //Loop through ingredients array and build table
      rec.extendedIngredients.forEach((item) => {
        //if it already exists
        if (INGREDIENTS[item.id]) {
          INGREDIENTS[item.id].frequency++;
        } else {
          INGREDIENTS[item.id] = {
            id: item.id,
            name: item.nameClean || item.name,
            category: item.aisle,
            frequency: 1,
          };
        }
      });

      //Loop through tags
      [
        [rec.cuisines, 'cuisines'],
        [rec.dishTypes, 'dish'],
        [rec.diets, 'diets'],
      ].forEach((arr) => {
        arr[0].forEach((item) => {
          if (TAGS[item]) {
            TAGS[item].frequency++;
          } else {
            TAGS[item] = {
              name: item,
              frequency: 1,
              category: arr[1],
            };
          }
        });
      });

      let recipe = {
        id: rec.id,
        title: rec.title,
        summary: rec.summary,
        readyInMinutes: rec.readyInMinutes,
        aggregateLikes: rec.aggregateLikes,
        servings: rec.servings,
        image: rec.image,
        pricePerServing: rec.pricePerServing,
        sourceName: rec.sourceName,
        sourceUrl: rec.sourceUrl,
        ingredients: rec.extendedIngredients.map((ing) => {
          return { ingredient_id: ing.id, name: ing.nameClean || ing.name, original: ing.original };
        }),
        instructionSections: rec.analyzedInstructions.length,
        instructions: rec.analyzedInstructions.map((x) => {
          return { name: x.name, steps: x.steps.map((s) => s.step) };
        }),
        tags: [...rec.cuisines, ...rec.dishTypes, ...rec.diets],
      };

      await db.Recipe.create(recipe);
    }
  }

  /**********************
   * POPULATE INGREDIENTS TABLE
   ***********************/
  console.log('POPULATING INGREDIENTS...');

  let values = Object.values(INGREDIENTS);

  for (let i = 0; i < values.length; i++) {
    if (!values[i].id) continue;
    await db.Ingredient.create(values[i]);
  }

  /**********************
   * POPULATE RECIPES_INGREDIENTS TABLE
   ***********************/
  console.log('POPULATING RECIPES-INGREDIENTS...');

  let data = await db.Recipe.findAll();

  for (let i = 0; i < data.length; i++) {
    let ingredients = data[i].ingredients;
    for (let j = 0; j < data[i].ingredients.length; j++) {
      let row = { recipe_id: data[i].id, ingredient_id: data[i].ingredients[j].ingredient_id };
      await db.RecipesIngredient.create(row);
    }
  }

  /**********************
   * POPULATE TAGS
   ***********************/
  console.log('POPULATING TAGS...');

  let tags = Object.values(TAGS);
  for (let i = 0; i < tags.length; i++) {
    await db.Tag.create(tags[i]);
  }

  /**********************
   * POPULATE RECIPES_TAGS
   ***********************/
  console.log('POPULATING TAGS...');

  const populateTags = async () => {
    let temp = await db.Tag.findAll();
    let tag_lookup = {};
    temp.forEach((x) => {
      tag_lookup[x.name] = parseInt(x.id);
    });

    let data = await db.Recipe.findAll();

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].tags.length; j++) {
        let row = { recipe_id: data[i].id, tag_id: tag_lookup[data[i].tags[j]] };
        await db.RecipesTag.create(row);
      }
    }
  };

  await populateTags();

  db.close();
};

main();
