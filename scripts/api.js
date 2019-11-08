import arrayItem from './store.js';
const baseUrl = 'https://thinkful-list-api.herokuapp.com/sophia-koeut'

const getBookmarks = function () {
    return fetch(`${baseUrl}/bookmarks`)
        .then(function (response) {
            return response.json()})
        .then(function (responseJson) {
            let addExpandedArray = responseJson.map(bookmark => ({...bookmark, expanded: false}))
            return addExpandedArray;
        })
        .catch(err => {
            arrayItem.store.error = err.message;
            `<p>${err.message}</p>`
        })
}

const createBookmark = function (newItem) {
    let newItemJSON = JSON.stringify(newItem);
    console.log(newItem);
    return fetch(`${baseUrl}/bookmarks`,
        {
            method: 'POST',
            headers: new Headers ({
                'Content-Type': 'application/json'
            }),
            body: newItemJSON,
        })
        .then(function (response){
            return response.json();
        })
        .catch(err => {
            arrayItem.store.error = err.message;
            `<p>${err.message}</p>`
        })
}



const deleteItem = function (id) {
    const options = {
      method: 'DELETE',
      headers: new Headers({
          'Content-Type': 'application/json'
        })
    };
    return fetch(`${baseUrl}/bookmarks/${id}`,options)
    .then(function (response){
        return response.json();
    })
    .catch(err => {
        arrayItem.store.error = err.message;
        `<p>${err.message}</p>`
    })
  };


export default {
    getBookmarks,
    createBookmark,
    deleteItem
}