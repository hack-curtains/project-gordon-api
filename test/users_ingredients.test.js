const request = require('supertest');
const { pool } = require('../models/index');
const app = require('../server/app');

const user_id = 999;

describe('Testing Favorite Ingredients', () => {
  const add = async (id) => {
    let res = await request(app).post(`/users/${user_id}/ingredients/${id}/add`);
    return res;
  };

  const remove = async (id) => {
    let res = await request(app).put(`/users/${user_id}/ingredients/${id}/remove`);
    return res;
  };

  const get = async () => {
    let res = await request(app).get(`/users/${user_id}/ingredients`);
    return res;
  };

  beforeEach(async () => {
    await pool.query(`delete from users_ingredients where user_id = ${user_id}`);
  });

  it('[users/ingredients] - should add an ingredient', async () => {
    const res = await add(15);
    let data = JSON.parse(res.text);
    expect(res.statusCode).toEqual(200);
    expect(data).toHaveProperty('message');
    expect(data.data).toHaveProperty('id', 15);
  });

  it('[users/ingredients] - should add then update if user adds same ingredient twice', async () => {
    const res1 = await add(31);
    let data1 = JSON.parse(res1.text);
    expect(data1).toHaveProperty('update', false);
    const res2 = await add(31);
    let data2 = JSON.parse(res2.text);
    expect(data2).toHaveProperty('update', true);
  });

  it('[users/ingredients] - should add 3 items', async () => {
    await add(10);
    await add(15);
    await add(30);
    let data = await pool.query(
      `select ingredient_id from users_ingredients where user_id = ${user_id}`
    );
    expect(data.rows.map((x) => x.ingredient_id)).toEqual([10, 15, 30]);
  });

  it('[users/ingredients] - should add 3 then remove 1', async () => {
    let res1 = await add(10);
    let res2 = await add(15);
    let res3 = await add(30);

    let res4 = await remove(30);
    let data4 = JSON.parse(res4.text);

    //response should contain found, user_id and ingredient_id
    expect(data4).toHaveProperty('found', true);
    expect(data4.data).toHaveProperty('user_id', user_id);
    expect(data4.data).toHaveProperty('ingredient_id', 30);

    //data should
    let data = await pool.query(
      `select ingredient_id from users_ingredients where user_id = ${user_id}`
    );
    expect(data.rows.map((x) => x.ingredient_id)).toEqual([10, 15]);
  });

  it('[users/ingredients] - should return an array of items', async () => {
    await add(10);
    await add(15);
    await add(30);
    await remove(30);
    let res = await get();
    let data = JSON.parse(res.text);
    expect(data.map((i) => i.id)).toEqual([10, 15]);
  });

  afterAll(async () => {
    await pool.end();
  });
});
