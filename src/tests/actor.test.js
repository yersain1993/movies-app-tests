const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test('POST /actors should create an actor', async () => {
    const actor = {
        firstName: "Keanu",
        lastName: "Reeves",
        nationality: "USA",
        image: "https://media.gq.com.mx/photos/5f57d52d4464f9b88fb26729/1:1/w_2000,h_2000,c_limit/Keanu-Reeves.jpg",
        birthday: "1986-09-06"
    };
    const res = await request(app)
        .post('/actors')
        .send(actor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('GET /actors should get all actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /actors should update an actor', async () => {
    const actor = {
        firstName: "Keanu",
        lastName: "Reeves",
    };
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(actor);
    expect(res.status).toBe(200);
});

test('DELETE /actors should delete an actor', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});