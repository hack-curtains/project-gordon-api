const fs = require('fs/promises');

const main = async () => {
  let files = await fs.readdir(__dirname + '/rawdata/json');

  files.sort(
    (a, b) => parseInt(a.substr(0, a.indexOf('.'))) - parseInt(b.substr(0, b.indexOf('.')))
  );

  let obj = {};
  let count = [0, 0];

  for (let i = 0; i < files.length; i++) {
    let data = await fs.readFile(__dirname + '/rawdata/json/' + files[i]);
    let json = JSON.parse(data);
    for (let r = 0; r < json.length; r++) {
      let { id, title, image, analyzedInstructions } = json[r];
      let steps = analyzedInstructions.map((x) => x.steps.length);
      count[0] += 1;
      count[1] += json[r].instructions ? 1 : 0;
    }
  }

  console.log(count[1], count[0], (count[1] * 100) / count[0]);
};

main();
