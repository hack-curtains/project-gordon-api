const apicache = require('apicache');

const cache = apicache.middleware;

const cacheFilters = (req, res) =>
  res.statusCode === 200 && !req.path.includes('users') && !req.path.includes('logs');

module.exports = cache('15 minutes', cacheFilters);
