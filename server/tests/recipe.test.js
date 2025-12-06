const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('GET /api/recipes', () => {
  it('should return all recipes', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});