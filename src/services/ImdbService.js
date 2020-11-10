function findByTitle(title) {
  return fetch(`https://imdb8.p.rapidapi.com/title/find?q=${title}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "a3e3d3a245msh70feee16c310b62p1338d2jsne7410931c6e1",
    },
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .then((response) => {
      console.log(response.results);
      console.log(response.results.map((item) => item.id));
      return response.results.filter((item) => item.id.includes("title"));
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

function findMoviesByUser(userID) {
  return Promise.resolve([]);
}

function fetchRandomMovies() {
  return Promise.resolve([
    {
      id: "tt0944947",
      title: "Game of throne",
      rating: 4.8,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      releaseYear: 2011,
    },
    {
      id: "tt0944947",
      title: "Game of throne",
      rating: 4.8,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      releaseYear: 2011,
    },
    {
      id: "tt0944947",
      title: "Game of throne",
      rating: 4.8,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      releaseYear: 2011,
    },
    {
      id: "tt0944947",
      title: "Game of throne",
      rating: 4.8,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      releaseYear: 2011,
    },
    {
      id: "tt0944947",
      title: "Game of throne",
      rating: 4.8,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      releaseYear: 2011,
    },
    {
      id: "tt0944947",
      title: "Game of throne",
      rating: 4.8,
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      releaseYear: 2011,
    },
  ]);
}

export default { findByTitle, findMoviesByUser, fetchRandomMovies };
