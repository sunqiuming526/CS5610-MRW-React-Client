// const url = "http://localhost:4000/articles"
const url = "https://mrw-final-project-node.herokuapp.com"

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
    }).then(response => articleId)


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


const findArticlesByTitle = (keyWord) => {
    return findAllArticles().then((response) => {
        //console.log(response);
        return response.filter((item)=> item.title.includes(keyWord))
    })
}

export default {
    findAllArticles,
    findArticleById,
    findArticlesByAuthor,
    createArticle,
    deleteArticle,
    updateArticle,
    findArticlesByTitle
}
