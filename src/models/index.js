const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, { through: 'MoviesActors' });
// Actor.belongsToMany(Movie, { through: 'MoviesActors' });

Movie.belongsToMany(Director, { through: 'MoviesDirectors' });
// Director.belongsToMany(Movie, { through: 'MoviesDirectors' });

Movie.belongsToMany(Genre, { through: 'MoviesGenres' });
// Genre.belongsToMany(Movie, { through: 'MoviesGenres' });