const request = require('supertest');
const { pool } = require('../models/index');
const app = require('../server/app');

describe('Testing Recipes Sorting and Pagination', () => {
  test('Should return 200 and default to 10 results', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    expect(data.rows.length).toEqual(10);
  });

  test('Should sort properly on {likes}', async () => {
    const res = await request(app).get('/recipes?sort=likes&direction=DESC');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    for (let i = 1; i < data.rows.length; i++) {
      expect(data.rows[i - 1].likes >= data.rows[i].likes).toEqual(true);
    }
  });

  test('Should sort properly on {price}', async () => {
    const res = await request(app).get('/recipes?sort=price&direction=ASC');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    for (let i = 1; i < data.rows.length; i++) {
      expect(data.rows[i - 1].price <= data.rows[i].price).toEqual(true);
    }
  });

  test('Should return {count} results', async () => {
    const res = await request(app).get('/recipes?count=20');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    expect(data.rows.length).toEqual(20);
  });

  test('Should paginate properly', async () => {
    const res1 = await request(app).get('/recipes?count=20&page=1');
    const data1 = JSON.parse(res1.text);
    const res2 = await request(app).get('/recipes?count=20&page=2');
    const data2 = JSON.parse(res2.text);
    const val1 = Math.max(...data1.rows.map((x) => x.id));
    const val2 = Math.min(...data2.rows.map((x) => x.id));
    expect(val2 > val1).toEqual(true);
  });

  test('Should paginate properly with sort', async () => {
    const res1 = await request(app).get('/recipes?count=20&page=1');
    const data1 = JSON.parse(res1.text);
    const res2 = await request(app).get('/recipes?count=20&page=2');
    const data2 = JSON.parse(res2.text);
    const val1 = Math.max(...data1.rows.map((x) => x.id));
    const val2 = Math.min(...data2.rows.map((x) => x.id));
    expect(val2 > val1).toEqual(true);
  });

  test('Should return error if page is incorrect', async () => {
    const res = await request(app).get('/recipes?count=asc&page=-1');
    const data = JSON.parse(res.text);
    expect(data.errors).toHaveProperty('page');
    expect(data.errors).toHaveProperty('count');
  });

  afterAll(async () => {
    await pool.end();
  });
});
