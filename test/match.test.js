const request = require('supertest');
const { POOL } = require('../models/index');
const app = require('../server/app');

describe('[match/ingredients]', () => {
  test('[matches/ingredients] - it should return a 200 ', async () => {
    let pantry = new Array(50).fill(0).map((_, i) => i + 1);
    let url = '/match/ingredients?query=garlic&count=2&ids=' + pantry.join(',');
    const res = await request(app).get(url);
    let data = JSON.parse(res.text);
    expect(res.status).toEqual(200);
  });

  test('[matches/ingredients] - should return match in descending order', async () => {
    let pantry = new Array(20).fill(0).map((_, i) => i + 1);
    let url = '/match/ingredients?count=50&ids=' + pantry.join(',');
    const res = await request(app).get(url);
    let data = JSON.parse(res.text);

    for (let i = 1; i < data.rows.length; i++) {
      expect(data.rows[i].ingredient_pct <= data.rows[i - 1].ingredient_pct).toEqual(true);
    }
  });

  afterAll(async () => {
    await POOL.end();
  });
});
