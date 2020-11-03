const findByTitle = (title) =>
  fetch(`https://imdb8.p.rapidapi.com/title/find?q=${title}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "a3e3d3a245msh70feee16c310b62p1338d2jsne7410931c6e1"
    }
  })
    .then(response => {
      // console.log(response.json());
      return response.json()
    }).then(response => {
    console.log(response.results)
    console.log(response.results.map(item => item.id))
    return response.results.filter(item => item.id.includes("title"))
  })
    .catch(err => {
      console.log(err);
      return err;
    });


export default {findByTitle}