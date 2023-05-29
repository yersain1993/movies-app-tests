const request = require('supertest');
const app = require('../app');
require('../models');

let directorId;

test('POST /directors should create director', async () => {
    const director = {
        firstName: "Guillermo",
        lastName: "Del Toro",
        nationality: "Mexican",
        image: "https://media.vogue.mx/photos/639dffb4032129c563966a05/4:3/w_4168,h_3126,c_limit/guillermo-del-toro.jpg",
        birthday: "1964-10-09"
    };
    const res = await request(app)
        .post('/directors')
        .send(director);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('GET /directors should get all director', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /directors should update director', async () => {
    const director = {
        firstName: "Guillermo",
        lastName: "del Toro",
    };
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(director);
    expect(res.status).toBe(200);
});

test('DELETE /directors should delete director', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});