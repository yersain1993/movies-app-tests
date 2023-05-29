const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
require('../models');

let genreId;

test('POST /genres should create a genre', async() => {
    const genre = {
        name: "Horror"
    };
    const res = await request(app)
        .post('/genres')
        .send(genre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('GET /genres should get all genres', async() => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /genres should update a genre', async() => {
    const genre = {
        name: "Thriller"
    };
    const res = await request(app)
        .put(`/genres/${genreId}`)
        .send(genre);
    expect(res.status).toBe(200);
});

test('DELETE /genres should delte a genre', async() => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
})

