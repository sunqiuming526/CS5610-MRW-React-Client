const url = "http://localhost:4000/articles"

const findAllArticles = () =>
    fetch(url)
        .then(response => response.json())

const findArticleById = (articleId) =>{
    return fetch(`${url}/${articleId}`)
        .then(response => {
            return response.json();
        })
}


const findArticlesByAuthor= (userId) =>
    fetch(`${url}/${userId}/allArticles`)
        .then(response => response.json())

const createArticle = (newArticle) =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(newArticle),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


const deleteArticle = (articleId) =>
    fetch(`${url}/${articleId}`, {
        method: 'DELETE'
    }).then(response => response.json())

const updateArticle = (articleId, newArticle) =>
    fetch(`${url}/${articleId}`, {
        method:'PUT',
        body: JSON.stringify(newArticle),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => {
        //console.log(response.json());
        return response.json()
    })


const searchByTitle = (keyWord) => {
    return findAllArticles.then((response) => {
        //console.log(response.results);
        return response.results.filter((item)=> item.title.includes(keyWord))
    })
}

export default {
    findAllArticles,
    findArticleById,
    findArticlesByAuthor,
    createArticle,
    deleteArticle,
    updateArticle,
    searchByTitle
}
