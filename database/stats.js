const fs = require('fs/promises');

const main = async () => {
  let files = await fs.readdir(__dirname + '/rawdata/json');

  files.sort(
    (a, b) => parseInt(a.substr(0, a.indexOf('.'))) - parseInt(b.substr(0, b.indexOf('.')))
  );

  let obj = {};

  for (let i = 0; i < files.length; i++) {
    let data = await fs.readFile(__dirname + '/rawdata/json/' + files[i]);
    let json = JSON.parse(data);
    for (let r = 0; r < json.length; r++) {
      let { id, title, image, analyzedInstructions } = json[r];
      let steps = analyzedInstructions.map((x) => x.steps.length);
      console.log([id, title, image, steps].join('\t'));
    }
  }
};

main();
