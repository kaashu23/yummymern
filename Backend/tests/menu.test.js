const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');

describe('Menu API Endpoints', () => {
  // Connect to DB before tests
  beforeAll(async () => {
    // If running in a CI environment, you might want a separate test database
    // For this portfolio demo, we'll just connect to the main one provided in .env
    // Ensure we are connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });

  // Close connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /api/menu should return a list of menu items', async () => {
    const res = await request(app).get('/api/menu');
    
    if (res.statusCode !== 200) {
      console.log('Error Body:', res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    // Assuming the DB is seeded, we should have items
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('price');
      expect(res.body[0]).toHaveProperty('description');
    }
  });

  it('GET /api/categories should return a list of categories', async () => {
    const res = await request(app).get('/api/categories');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('slug');
    }
  });
});
