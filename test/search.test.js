const request = require('supertest');
const { POOL } = require('../models/index');
const app = require('../server/app');

describe('Testing Recipes Search', () => {
  test('Ingredient search should return all matches that contain {ids}', async () => {
    const res = await request(app).get('/search/ingredients/?ids=2,3,4&count=50');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    let ingredients = data.rows.map((r) => r.ingredients.map((i) => i.id));
    for (let i = 0; i < ingredients.length; i++) {
      expect(ingredients[i].includes(2)).toEqual(true);
      expect(ingredients[i].includes(3)).toEqual(true);
      expect(ingredients[i].includes(4)).toEqual(true);
    }
  });

  test('Tag search should return all matches that contain {ids}', async () => {
    const res = await request(app).get('/search/tags/?ids=2,3,4&count=100');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    let tags = data.rows.map((r) => r.tags.map((t) => t.id));
    for (let i = 0; i < tags.length; i++) {
      expect(tags[i].includes(2)).toEqual(true);
      expect(tags[i].includes(3)).toEqual(true);
      expect(tags[i].includes(4)).toEqual(true);
    }
  });

  test('/search?ingredient_ids AND /search/ingredients?ids should return same result set', async () => {
    const res1 = await request(app).get('/search/?ingredient_ids=2,3,4');
    expect(res1.statusCode).toEqual(200);
    let data1 = JSON.parse(res1.text).rows;
    const res2 = await request(app).get('/search/ingredients/?ids=2,3,4');
    expect(res2.statusCode).toEqual(200);
    let data2 = JSON.parse(res1.text).rows;
    expect(data1).toEqual(data2);
  });

  test('/search?tag_ids AND /search/tags?ids should return same result set', async () => {
    const res1 = await request(app).get('/search/?tag_ids=2,3,4');
    expect(res1.statusCode).toEqual(200);
    let data1 = JSON.parse(res1.text).rows;
    const res2 = await request(app).get('/search/tags/?ids=2,3,4');
    expect(res2.statusCode).toEqual(200);
    let data2 = JSON.parse(res1.text).rows;
    expect(data1).toEqual(data2);
  });

  test('Should return a result set where all contain query', async () => {
    const res = await request(app).get('/search?query=garlic&count=100');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    let titles = data.rows.map((r) => r.title);
    for (let i = 0; i < titles.length; i++) {
      expect(titles[i].toLowerCase().includes('garlic')).toEqual(true);
    }
  });

  test('Should return no rows when query does not exist', async () => {
    const res = await request(app).get('/search?query=asdfasdfasdf&count=100');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    expect(data.rows.length).toEqual(0);
  });

  test('Should return error when ids are not positive integers', async () => {
    const res = await request(app).get('/search?tag_ids=a,b,c&ingredient_ids=-1,-2');
    expect(res.statusCode).toEqual(200);
    let data = JSON.parse(res.text);
    expect(data.errors).toHaveProperty('tag_ids');
    expect(data.errors).toHaveProperty('ingredient_ids');
  });

  afterAll(async () => {
    await POOL.end();
  });
});
