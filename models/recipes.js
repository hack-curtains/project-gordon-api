const { POOL, RECIPE_COLUMNS } = require('./index.js');
const ABBREVIATED_COLUMNS = RECIPE_COLUMNS.join(', ');

/******************************
 * Get Query Parameters
 * Given an object with query params
 * Return an object containing validation errors
 *****************************/

const getQueryParamErrors = (obj) => {
  let e = { message: 'there was an issue with your query parameters', errors: {} };

  if (obj.page <= 0 || !Number.isInteger(parseInt(obj.page))) {
    e.errors.page = { value: obj.page, message: 'must be a positive integer' };
  }

  if (obj.count <= 0 || !Number.isInteger(parseInt(obj.count))) {
    e.errors.count = { value: obj.count, message: 'must be a positive integer' };
  }

  if (!['default', 'likes', 'price'].includes(obj.sort.toLowerCase())) {
    e.errors.sort = { value: obj.sort, message: 'must be one of: default|likes|price' };
  }

  if (!['asc', 'desc'].includes(obj.direction.toLowerCase())) {
    e.errors.direction = { value: obj.direction, message: 'must be one of: asc|desc' };
  }

  obj.tag_ids.forEach((id) => {
    if (id <= 0 || !Number.isInteger(id)) {
      e.errors.tag_ids = { value: obj.tag_ids, message: 'all tag_ids must be positive integers' };
    }
  });

  obj.ingredient_ids.forEach((id) => {
    if (id <= 0 || !Number.isInteger(id)) {
      e.errors.ingredient_ids = {
        value: obj.ingredient_ids,
        message: 'all ingredient_ids must be positive integers',
      };
    }
  });

  return e;
};

/******************************
 * Given query parameters
 * Return a WHERE statement
 *****************************/

const getWhereSQL = ({ include, tag_ids, ingredient_ids, query }) => {
  let chunks = [];

  let operator = include === true ? '@>' : '&&';

  if (tag_ids.length > 0) {
    chunks.push(`(tag_ids ${operator} Array[${tag_ids.join(',')}]::integer[])`);
  }

  if (ingredient_ids.length > 0) {
    chunks.push(`(ingredient_ids ${operator} ARRAY[${ingredient_ids.join(',')}]::INTEGER[])`);
  }

  if (query.length > 0) {
    chunks.push(`(title ILIKE '%${query}%')`);
  }

  if (chunks.length === 0) return '';

  if (include === true) {
    return 'WHERE' + chunks.join(' AND ');
  } else {
    return 'WHERE NOT (' + chunks.join(' OR ') + ')';
  }
};

/******************************
 * Given query parameters
 * Return an ORDER by Statement
 *****************************/
const getOrderSQL = ({ sort, direction }) => {
  let col = sort === 'default' ? 'id' : sort;
  return `ORDER BY ${col} ${direction}`;
};

/******************************
 * Returns an abbreviated list of recipes
 * Used for rendering many recipe cards
 ******************************/
module.exports.getRecipes = async (params = {}) => {
  //default values
  const {
    page = 1,
    count = 10,
    sort = 'id',
    direction = 'desc',
    include = true,
    tag_ids = [],
    ingredient_ids = [],
    query = '',
  } = params;

  //validate query params
  const errors = getQueryParamErrors({
    page,
    count,
    sort,
    direction,
    include,
    tag_ids,
    ingredient_ids,
    query,
  });

  if (Object.values(errors.errors).length > 0) {
    return errors;
  }

  const WHERE = getWhereSQL({ include, tag_ids, ingredient_ids, query });
  const ORDER = getOrderSQL({ sort, direction });
  const OFFSET = (page - 1) * count;

  const SQL = `
    SELECT ${ABBREVIATED_COLUMNS} FROM recipes ${WHERE} ${ORDER} OFFSET ${OFFSET} LIMIT ${count};
    SELECT count(1) from recipes ${WHERE};
  `;

  let data = await POOL.query(SQL);
  let out = {
    page: parseInt(page),
    count: parseInt(count),
    sort: sort,
    direction: direction,
    query: query,
    tag_ids: tag_ids,
    ingredient_ids: ingredient_ids,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };

  return out;
};

module.exports.getRecipe = async ({ id = 2 }) => {
  const SQL = `
    SELECT *
    FROM recipes
    WHERE id = ${id}
  `;
  let data = await POOL.query(SQL);
  return data.rowCount === 0 ? { message: 'not found' } : data.rows[0];
};
