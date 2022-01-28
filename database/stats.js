const fs = require('fs/promises');

const main = async () => {
  let files = await fs.readdir(__dirname + '/rawdata');

  let obj = {};

  for (let i = 0; i < files.length; i++) {
    let data = await fs.readFile(__dirname + '/rawdata/' + files[i]);
    let json = JSON.parse(data);
    for (let r = 0; r < json.recipes.length; r++) {
      obj[json.recipes[r].id] = 1;
    }
  }

  console.log(Object.keys(obj).length);
};

main();
