const url = "http://localhost:4000/articles"

const findAllArticles = () =>
    fetch(url)
        .then(response => response.json())

const findArticleByAuthor= (userId) =>
    fetch(`${url}/${userId}`)
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

const updateArticle = (articleId, newArticle) => {
    fetch(`${url}/${articleId}`, {
        method:'PUT',
        body: JSON.stringify(newArticle),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const searchByTitle = (keyWord) => {
    return findAllArticles.then((response) => {
        console.log(response.results);
        return response.results.filter((item)=> item.title.includes(keyWord))
    })
}

export default {
    findAllArticles,
    findArticleByAuthor,
    createArticle,
    deleteArticle,
    updateArticle,
    searchByTitle
}
