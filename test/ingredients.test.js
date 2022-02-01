const request = require('supertest');
const { POOL } = require('../models/index');
const app = require('../server/app');

describe('Testing Ingredients', () => {
  test('Should return 200 and have correct properties', async () => {
    const res = await request(app).get('/ingredients');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('category');
    expect(data[0]).toHaveProperty('frequency');
  });

  afterAll(async () => {
    await POOL.end();
  });
});
