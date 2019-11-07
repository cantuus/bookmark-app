import init from './initpg.js';
import api from './api.js';
import arrayItem from './store.js';

const main = function () {
    init.bindEventListeners();
    api.getBookmarks().then(function(response){
        arrayItem.store.bookmarks = response;
        init.render();
    });
};

$(main);
