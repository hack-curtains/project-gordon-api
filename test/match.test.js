const request = require('supertest');
const { POOL } = require('../models/index');
const app = require('../server/app');

describe('Testing Ingredient Match', () => {
  test('Every ingredient returned should be in the users pantry', async () => {
    let pantry = new Array(75).fill(0).map((_, i) => i + 1);
    let url = '/match/ingredients/?count=50&ids=' + pantry.join(',');

    const res = await request(app).get(url);
    let data = JSON.parse(res.text);
    expect(res.statusCode).toEqual(200);
    expect(data).toHaveProperty('exact_ingredient_match');

    let ingredients = data.rows.map((r) => r.ingredients.map((i) => i.id));
    ingredients.forEach((list) => {
      list.forEach((item) => {
        expect(pantry.includes(item)).toEqual(true);
      });
    });
  });

  test('[match/ingredients] - as you add ingredients, the results should increase', async () => {
    let res = await POOL.query('SELECT id from ingredients ORDER BY frequency DESC');
    let pantry = res.rows.map((i) => i.id);

    let last = 0;
    for (let i = 20; i < 250; i += 10) {
      let url = '/match/ingredients/?count=50&ids=' + pantry.slice(0, i).join(',');
      const res = await request(app).get(url);
      let data = JSON.parse(res.text);
      expect(data.totalRows >= last).toBe(true);

      last = data.totalRows;
    }
  });

  afterAll(async () => {
    await POOL.end();
  });
});
