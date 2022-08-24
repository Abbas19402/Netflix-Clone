const apiKey = 'd783b21f4df68f71fbb0a780874f6cfb'
export const MoviesAndSeries = [
    {
        key: 0,
        name: 'Upcoming Movies',
        API: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
        type: 'movie'
    },
    {
        key: 1,
        name: 'Netflix Orginals',
        API: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_network=213`,
        type: 'tv'
    },
    {
        key: 2,
        name: 'Trending Now',
        API: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&langauge=en-US`,
        type: 'movie'
    },
    {
        key: 3,
        name: 'Top Rated',
        API: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&langauge=en-US`,
        type: 'tv'
    },
    {
        key: 4,
        name: 'Actions',
        API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`,
        type: 'movie'
    },
    {
        key: 5,
        name: 'Comedies',
        API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`,
        type: 'movie'
    },
    {
        key: 6,
        name: 'Horror',
        API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`,
        type: 'movie'
    },
    {
        key: 7,
        name: 'Romance',
        API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749`,
        type: 'movie'
    },
    {
        key: 8,
        name: 'Documentaries',
        API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=99`,
        type: 'movie'
    }
];