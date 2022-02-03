const fs = require('fs/promises');
const { POOL } = require('../models/index.js');

module.exports.printLogs = async (req, res) => {
  let url = __dirname + '/../logs/info.log';

  let data = await fs.readFile(url, 'utf8');

  let json = data
    .split('\n')
    .filter((x) => x.length > 10)
    .map((x) => JSON.parse(x));

  let out = json.slice(-100);

  let table =
    '<table style="white-space: nowrap"><tr>' +
    out
      .map(
        (x, i) =>
          '<td>' +
          [
            `${Math.max(0, json.length - 100) + i + 1}`,
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
  <h3>Displaying ${out.length} rows of ${json.length} total</h3>
  ${table}
  `;

  res.send(html);
};

module.exports.printDB = async (req, res) => {
  let SQL = `
  SELECT relname as tablename,n_live_tup  as rows
  FROM pg_stat_user_tables
  ORDER BY n_live_tup DESC;
  SELECT
  table_name,
  column_name,
  data_type
  FROM
  information_schema.columns
  WHERE table_catalog = 'recipes' and table_schema = 'public'
  ORDER BY table_name, ordinal_position`;
  let data = await POOL.query(SQL);

  res.send({
    counts: data[0].rows.map((x) => x.rows + ', ' + x.tablename),
    tables: data[1].rows.map((x) => x.table_name + ' - ' + x.column_name + '(' + x.data_type + ')'),
  });
};
