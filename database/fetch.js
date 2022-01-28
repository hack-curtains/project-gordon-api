/******************************************
 * READS recipe IDS from rawdata/ids.csv
 * Gets the next LIMIT recipes
 * Saves them to rawdata/max_returned_id.json
 ******************************************/

const fs = require('fs/promises');
const axios = require('axios');

const LIMIT = 25;

const main = async () => {
  //GET THE MAX ID THAT HAS ALREADY BEEN SAVED
  let ids = await fs.readdir(__dirname + '/rawdata/json');
  ids = ids.map((x) => parseInt(x.substr(0, x.indexOf('.'))));
  ids.sort((a, b) => b - a);
  const START = ids[0] || 0;

  //BUILD ARRAY OF THE NEXT [LIMIT] TO FETCH
  let fetch = [];
  let stream = await fs.readFile(__dirname + '/rawdata/ids.csv', 'utf8');
  let data = stream.split('\n').map((x) => parseInt(x));
  data.forEach((id) => {
    if (fetch.length < LIMIT && id > START) {
      fetch.push(id);
    }
  });

  //FETCH AND SAVE
  const URL =
    'https://api.spoonacular.com/recipes/informationBulk?apiKey=0122f895d78848d690b366c3d0eb7925&ids=' +
    fetch.join(',');

  const FILE = __dirname + '/rawdata/json/' + fetch[fetch.length - 1] + '.json';
  let res = await axios.get(URL);
  console.log(res.headers['x-api-quota-used']);
  await fs.writeFile(FILE, JSON.stringify(res.data));
};

main();
