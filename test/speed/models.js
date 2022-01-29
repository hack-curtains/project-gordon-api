const { getRecipes } = require('../../models/recipes.js');
const { pool } = require('../../models/index.js');

let DATA = [];

console.log('---------------------------------------');
console.log(' SPEED TESTING');
console.log('---------------------------------------');

(async function main() {
  //GET TABLE SIZES
  let result = await pool.query('select count(1) from recipes');
  let RECIPE_SIZE = result.rows[0].count;

  //TEST RECIPE QUERIES
  for (let i = 0; i < 100; i++) {
    let page = Math.floor(((RECIPE_SIZE - 50) * Math.random()) / 50);

    let time1 = new Date().getTime();
    await getRecipes({ page: page, count: 50 });
    let time2 = new Date().getTime();
    DATA.push(time2 - time1);
  }

  console.log(`getRecipes() mean=${mean(DATA)}ms, stdev=${stdev(DATA)}ms`);

  pool.end();
})();

//STAT LIBS
function stdev(numArray) {
  const mean = numArray.reduce((s, n) => s + n) / numArray.length;
  const variance = numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length - 1);
  return Math.round(10000 * Math.sqrt(variance)) / 10000;
}

function mean(numArray) {
  return Math.round((10000 * numArray.reduce((s, n) => s + n)) / numArray.length) / 10000;
}
