const { getTags } = require('../models/tags.js');

module.exports.getTags = async (req, res) => {
  try {
    let data = await getTags();
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: 'error processing request', error: err });
  }
};
