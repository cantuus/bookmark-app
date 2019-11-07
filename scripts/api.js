const baseUrl = 'https://thinkful-list-api.herokuapp.com/sophia-koeut'

const getBookmarks = function () {
    return fetch(`${baseUrl}/bookmarks`)
        .then(function (response) {
            return response.json()})
        .then(function (responseJson) {
            let addExpandedArray = responseJson.map(bookmark => ({...bookmark, expanded: false}));
            return addExpandedArray;
        });
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
        });
}



const deleteItem = function (id, deletedItem) {
    const options = {
      method: 'DELETE',
      headers: new Headers({'Content-Type': 'application/json'})
    };
    return apiFetch(BASE_URL+`/bookmarks/${id}`,options);
  };


export default {
    getBookmarks,
    createBookmark,
    deleteItem
}