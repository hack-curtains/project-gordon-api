const express = require('express');
const port = process.env.PORT || 3000;
const { data, ingredients, cuisines, dishTypes, diets } = require('./data');

const { getRecipes, getRecipe } = require('../models/recipes.js');
const { getTags } = require('../models/tags.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  let html = `
    <h1>Recipes API</h1>
    <p><span style='background-color: #ffcc33'>/recipes</span> - returns a list of recipes, defaults: <b>?page=1&count=10'</b></p>
    <p><span style='background-color: #ffcc33'>/recipes/:id</span> - returns a single recipe, <b>default id=1'</b></p>
    <p><span style='background-color: #ffcc33'>/ingredients</span> - returns an array of all unique incredients</p>
    <p><span style='background-color: #ffcc33'>/search</span> - returns recipes that contain ingredients <b>?page=1&count=10&ingredients=flour,sugar,milk</b></p>
    <p><span style='background-color: #ffcc33'>/tags</span> - returns an object that enumerates all tags</p>
    `;
  res.send(html);
  // res.json({ '/recipes': 'returns a list of recipes, defaults: ?page=1&count=10', '/recipes/:id': 'returns a recipe ' });
});

app.get('/api/recipes', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 10;
  let data = await getRecipes({ page, count });
  res.json(data);
});

app.get('/api/recipes/:id', async (req, res) => {
  const id = req.params.id;
  let data = await getRecipe({ id });
  res.json(data);
});

app.get('/api/tags', async (req, res) => {
  let data = await getTags();
  res.json(data);
});

// app.get('/recipes', (req, res) => {
//   const page = req.query.page || 1;
//   const count = req.query.count || 10;

//   const start = (page - 1) * count;
//   const end = start + count;

//   res.json(data.slice(start, end));
// });

// app.get('/tags', (req, res) => {
//   res.json({
//     diets: diets,
//     dishTypes: dishTypes,
//     cuisines: cuisines,
//   });
// });

// app.get('/filter', (req, res) => {
//   const page = parseInt(req.query.page || 1);
//   const count = parseInt(req.query.count || 10);
//   const tags = (req.query.tags || '').split(',');

//   const start = (page - 1) * count;
//   const end = start + count;

//   let temp = {};
//   data.forEach((r) => {
//     let found = new Array(tags.length).fill(false);
//     tags.forEach((t, i) => {
//       let str = r.cuisines.join(' ') + ' ' + r.dishTypes.join(' ') + ' ' + r.diets.join(' ');
//       if (str.toLowerCase().includes(t.toLowerCase())) {
//         found[i] = true;
//       }
//     });
//     if (found.reduce((a, b) => a && b, true)) {
//       temp[r.id] = r;
//     }
//   });

//   let out = Object.values(temp);
//   out.sort((a, b) => parseInt(a.id) - parseInt(b.id));

//   res.json({
//     tags: tags,
//     page: page,
//     start: start,
//     end: end,
//     count: out.length,
//     results: out.slice(start, end),
//   });
// });

// app.get('/search', (req, res) => {
//   const page = req.query.page || 1;
//   const count = req.query.count || 10;
//   const ingredients = req.query.ingredients || '';
//   const arr = ingredients.split(',');
//   const start = (page - 1) * count;
//   const end = start + count;

//   let temp = {};
//   let found;

//   data.forEach((r) => {
//     found = new Array(arr.length).fill(false);
//     r.ingredients.forEach((i) => {
//       arr.forEach((q, index) => {
//         if (i.name.toLowerCase().includes(q.toLowerCase())) {
//           found[index] = true;
//         }
//       });
//     });
//     if (found.reduce((a, b) => a && b, true)) {
//       temp[r.id] = r;
//     }
//   });

//   let out = Object.values(temp);
//   out.sort((a, b) => parseInt(a.id) - parseInt(b.id));

//   res.json({
//     query: arr,
//     page: page,
//     start: start,
//     end: end,
//     count: out.length,
//     results: out.slice(start, end),
//   });
// });

// app.get('/recipes/:id', (req, res) => {
//   let id = 1;
//   if (req.params.id && req.params.id > 0 && req.params.id < 900) {
//     id = req.params.id;
//   }

//   let records = data.filter((x) => parseInt(x.id) === parseInt(id));

//   res.json(records.length > 0 ? records[0] : data[0]);
// });

// app.get('/ingredients', (req, res) => {
//   res.json(ingredients);
// });

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
