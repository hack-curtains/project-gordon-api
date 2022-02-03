const request = require('supertest');
const { POOL } = require('../models/index');
const app = require('../server/app');

describe('[match/ingredients] - Testing Ingredient Match', () => {
  test('', async () => {
    let pantry = new Array(50).fill(0).map((_, i) => i + 1);
    let url = '/match/ingredients/?query=garlic&count=2&ids=' + pantry.join(',');
    const res = await request(app).get(url);
    let data = JSON.parse(res.text);
    expect(res.status).toEqual(200);
  });

  afterAll(async () => {
    await POOL.end();
  });
});
