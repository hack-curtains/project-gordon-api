const fs = require('fs/promises');

module.exports = async (req, res) => {
  let url = __dirname + '/../logs/info.log';

  let data = await fs.readFile(url, 'utf8');

  let json = data
    .split('\n')
    .filter((x) => x.length > 10)
    .slice(-100)
    .map((x) => JSON.parse(x));

  let table =
    '<table style="white-space: nowrap"><tr>' +
    json
      .map(
        (x, i) =>
          '<td>' +
          [
            `${i + 1}`,
            `🌐 ${x.req.method}`,
            `🌐 ${x.req.url}`,
            `${x.res.statusCode === 200 ? '✅' : '⚠️'} ${x.res.statusCode}`,
            `⚡ ${x.responseTime}ms`,
            `🏡 ${x.req.headers.host}`,
            `💻 ${x.req.headers['user-agent']}`,
            `📅 ${new Date(x.time)}`,
            `🏠 ${x.hostname}`,
          ].join('</td><td>') +
          '</td>'
      )
      .join('</tr><tr>') +
    '</tr></table>';

  let html = `
  <style>
    table, td, tr {
      border: 1px solid #ccc;
      border-collapse: collapse;
      padding: 5px;
    }
    table {
      margin: 20px;
      font-size: 0.8em;
    }
  </style>
  ${table}
  `;

  res.send(html);
};
