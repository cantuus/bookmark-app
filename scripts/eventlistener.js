import init from './initpg.js';
import arrayItem from './store.js';

const attachNewButtonClick = function () {
    $(document).ready(function () {
        $('.main-container').on('click', '.add-bookmark', event => {
            event.preventDefault();
            init.render(true);
        });
    })
}

const attachBookMarkSelectionClick = function () {
    $(document).ready(function () {
        $('.main-container').on('click', '.bookmark-list-item', event => {
            event.preventDefault();
            const id = getItemIdFromElement(event.currentTarget);
            let foundItem = getItem(id);
            foundItem.expanded = !foundItem.expanded;
            init.render(false);
        })
    })
}

const attachFilterBookmarks = function () {
    $(document).ready(function () {
        $('#filter-rating').change(function (event) {
            event.preventDefault;
            init.render(false, true);
        })
    })
}

const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.bookmark-list-item')
        .data('item-id');
};

//retrieving the object with the matching id obtained from the click event from the store
const getItem = function (id) {
    let foundItem = arrayItem.store.bookmarks.find(function (item) {
        return item.id === id;
    });
    return foundItem;
}

export default {
    attachBookMarkSelectionClick,
    attachFilterBookmarks,
    attachNewButtonClick,
    getItem,
    getItemIdFromElement
}