//initial view store
const store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
};


//expand view store
const store2 = {
    bookmarks: [
        {
            id: '7ddr',
            title: 'Title 11',
            rating: 5,
            url: 'http://www.title11.com',
            description: 'lorem ipsum dolor',
            expanded: true
        }
    ],
    adding: false,
    error: null,
    filter: 0
};

//add bookmark store
const store3 = {
    bookmarks: [],
    adding: true,
    error: null,
    filter: 0
};

export default {
    store,
    store2
};