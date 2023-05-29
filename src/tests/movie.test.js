const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let movieId;

test('POST /movies should create movie', async () => {
    const movie = {
        name: "El laberinto del Fauno",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTnMFjV5hQZicXe4NNYChzlZTwZjEhk8SETQgM8Wg9FPdfW-Am_",
        synopsis: `Ofelia es una niña solitaria que conoce a un fauno en un antiguo laberinto. El fauno, una extraña criatura, 
                    le hace una sorprendente revelación: ella es en realidad una princesa, la última de su estirpe, y los suyos la esperan desde hace mucho tiempo. 
                    Para poder regresar a su mágico reino, la niña deberá enfrentarse a tres pruebas.`,
        releaseYear: "2007"
    };
    const res = await request(app)
        .post('/movies')
        .send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('GET /movies should get all movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
});

test('PUT /movies should update movie', async () => {
    const movie = {
        name: "El Laberinto del Fauno",
    };
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(movie);
    expect(res.status).toBe(200);
});

test('POST /movies/:id/actors should set actors in movies', async () => {
    const actor = await Actor.create({
        firstName: "Ivana ",
        lastName: "Baquero Macías",
        nationality: "Spanish",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Ivana_Baquero.png",
        birthday: "1994-11-05"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors should set a director in movies', async () => {
    const director = await Director.create({
        firstName: "Guillermo",
        lastName: "Del Toro",
        nationality: "Mexican",
        image: "https://media.vogue.mx/photos/639dffb4032129c563966a05/4:3/w_4168,h_3126,c_limit/guillermo-del-toro.jpg",
        birthday: "1964-10-09"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres should set a genre in movies', async () => {
    const genre = await Genre.create({
        name: "Fantasy"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies should delete movie', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});