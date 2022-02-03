const fs = require('fs/promises');
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const main = async () => {
  let data = await fs.readFile(__dirname + '/SPEC.md', 'utf8');

  let html = `
  <!DOCTYPE html>
  <html lang="en">
    <meta charset="UTF-8">
    <title>Project Gordon API Docs</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="markdown.css">

    <body>
      <h5>${new Date()}</h5>
      ${marked.parse(data)}
    </body>
  </html>
  `;
  await fs.writeFile(__dirname + '/index.html', html);
};

main();
