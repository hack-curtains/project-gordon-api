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

const getWhereSQL = ({ include, tag_ids, ingredient_ids, query, exact }) => {
  let chunks = [];

  let tag_operator = include === true ? '@>' : '&&';
  let ingredient_operator = include === true ? '@>' : '&&';
  if (exact === true) {
    ingredient_operator = '<@';
  }

  if (tag_ids.length > 0) {
    chunks.push(`(tag_ids ${tag_operator} Array[${tag_ids.join(',')}]::integer[])`);
  }

  if (ingredient_ids.length > 0) {
    chunks.push(
      `(ingredient_ids ${ingredient_operator} ARRAY[${ingredient_ids.join(',')}]::INTEGER[])`
    );
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
    exact = false,
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

  const WHERE = getWhereSQL({ include, tag_ids, ingredient_ids, query, exact });
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
    fetchTime: new Date(),
    sort: sort,
    direction: direction,
    query: query,
    tag_ids: tag_ids,
    ingredient_ids: ingredient_ids,
    exact_ingredient_match: exact,
    totalRows: parseInt(data[1].rows[0].count),
    queryRows: data[0].rowCount,
    rows: data[0].rows,
  };

  return out;
};

/******************************
 * Returns an abbreviated list of recipes
 * Used for rendering many recipe cards
 ******************************/
module.exports.getRecipe = async ({ id = 2 }) => {
  const SQL = `
    SELECT *
    FROM recipes
    WHERE id = ${id}
  `;
  let data = await POOL.query(SQL);
  return data.rowCount === 0 ? { message: 'not found' } : data.rows[0];
};

/******************************
 * Returns a paginated list of recipes sorted by match score
 ******************************/

module.exports.matchRecipes = async ({ page, count, ingredient_ids, query }) => {
  if (!ingredient_ids || ingredient_ids === 0) {
    return { message: 'all ingredient_ids must be positive integers' };
  }
  let WHERE = query.length > 0 ? `WHERE title ilike '%${query}%'` : '';
  let LIMIT = count;
  let OFFSET = (page - 1) * count;
  let SQL = `
  with matches as
  (
    select
    id, unnest(ingredient_ids)
    from recipes ${WHERE}
    intersect
    select
    id, unnest(array[${ingredient_ids.join(',')}])
    from recipes ${WHERE}
  )
  select
  r.id, r.title, array_length(r.ingredient_ids, 1)::int as ingredient_total,
  m.count::int as ingredient_matches, m.count::float/array_length(r.ingredient_ids, 1)::float as ingredient_pct,
  r.ingredient_ids,r.image,r.servings,r.price,r.likes,r.summary,r.tags,r.ingredients,r.time
  from recipes r
  join (select id, count(1) as count from matches group by id) m on r.id = m.id
  ORDER by ingredient_pct DESC
  LIMIT ${LIMIT} OFFSET ${OFFSET};
  `;

  let data = await POOL.query(SQL);

  let out = {
    page: parseInt(page),
    count: parseInt(count),
    ingredient_ids: ingredient_ids,
    query: query,
    rows: data.rows,
  };
  return out;
};
