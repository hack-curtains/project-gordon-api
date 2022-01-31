const fs = require('fs/promises');
const { db, sequelize } = require('./index.js');

let INGREDIENTS = {};
let TAGS = {};

const main = async () => {
  /**********************
   * POPULATE RECIPES TABLE
   ***********************/

  const populateRecipes = async () => {
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
              id: Object.keys(INGREDIENTS).length + 1,
              name: (item.nameClean || item.name).toLowerCase(),
              category: item.aisle,
              frequency: 1,
            };
          }
        });

        //Loop through tags
        rec.cuisines = rec.cuisines.map((x) => x.toLowerCase());
        rec.dishTypes = rec.dishTypes.map((x) => x.toLowerCase());
        rec.diets = rec.diets.map((x) => x.toLowerCase());
        [
          [rec.cuisines, 'cuisines'],
          [rec.dishTypes, 'dish'],
          [rec.diets, 'diets'],
        ].forEach((arr) => {
          arr[0].forEach((item) => {
            let index = item.toLowerCase();
            if (TAGS[index]) {
              TAGS[index].frequency++;
            } else {
              TAGS[index] = {
                id: Object.keys(TAGS).length + 1,
                name: index,
                frequency: 1,
                category: arr[1],
              };
            }
          });
        });

        let recipe = {
          title: rec.title,
          summary: rec.summary,
          time: rec.readyInMinutes,
          likes: rec.aggregateLikes,
          servings: rec.servings,
          image: rec.image,
          price: rec.pricePerServing,
          source_name: rec.sourceName,
          source_url: rec.sourceUrl,
          sections: rec.analyzedInstructions.length,
          instructions: rec.analyzedInstructions.map((x) => {
            return { name: x.name, steps: x.steps.map((s) => s.step) };
          }),
          ingredients: [...new Set(rec.extendedIngredients.map((ing) => ing.id))],
          tags: [...new Set([...rec.cuisines, ...rec.dishTypes, ...rec.diets])],
        };

        await db.Recipe.create(recipe);
      }
    }
  };

  /**********************
   * Populate Ingredients and Tags
   ***********************/
  const updateTags = async () => {
    let data = await db.Recipe.findAll({ attributes: ['id', 'tags', 'ingredients'] });

    for (let i = 0; i < data.length; i++) {
      let tags = data[i].tags.map((t) => TAGS[t]);
      let ingredients = data[i].ingredients.filter((i) => i !== null).map((i) => INGREDIENTS[i]);
      let tag_ids = tags.map((t) => t.id);
      let ingredient_ids = ingredients.map((i) => i.id);
      await db.Recipe.update(
        { tags, ingredients, tag_ids, ingredient_ids },
        { where: { id: data[i].id } }
      );
    }
  };

  /**********************
   * Add Tags and Ingredients Tables
   ***********************/
  const addTags = async () => {
    let tags = Object.values(TAGS);
    for (let i = 0; i < tags.length; i++) {
      await db.Tag.create(tags[i]);
    }
  };

  const addIngredients = async () => {
    let ingredients = Object.values(INGREDIENTS);
    for (let i = 0; i < ingredients.length; i++) {
      await db.Ingredient.create(ingredients[i]);
    }
  };

  console.log('INIT DATABASE...');
  await db.initialize();
  console.log('POPULATING RECIPES TABLE...');
  await populateRecipes();
  console.log('UPDATING TAGS & INGREDIENTS...');
  await updateTags();
  console.log('POPULATING TAGS TABLE...');
  await addTags();
  console.log('POPULATING INGREDIENTS TABLE...');
  await addIngredients();

  db.close();
};

main();
