const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');

const directorRouter = express.Router();

directorRouter.route('/')
    .get(getAll)
    .post(create);

directorRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = directorRouter;