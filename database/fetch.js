const fs = require('fs/promises');
const axios = require('axios');

const URL =
  'https://api.spoonacular.com/recipes/random?apiKey=64c72029d6874041844acb68d747458b&number=100';

const main = async () => {
  let res = await axios.get(URL);
  let path = __dirname + '/rawdata/' + Date.now() + '.json';
  await fs.writeFile(path, JSON.stringify(res.data));
};

main();
