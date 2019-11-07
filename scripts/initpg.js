import arrayItem from './store.js';
import expanded from './expanded.js';
import addbook from './addbook.js';
import listeners from './eventlistener.js';

const render = function (newButtonClicked, selectOptionClicked) {
    let arrayItems = arrayItem.store.bookmarks;
    let pageHtml = '';

    if (newButtonClicked === true) {
        pageHtml = addbook.displayAddBookmark(pageHtml);
    } else {
        let buttonOptions = displayOptions();
        pageHtml = '' + buttonOptions;

        if (selectOptionClicked === true) {
            arrayItems = filterBookmarks();
        }

        arrayItems.forEach(function (arrayItem) {
            if (arrayItem.expanded === true) {
                pageHtml = expanded.displayExpandedHtml(arrayItem, pageHtml);
            }
            else {
                pageHtml = displayUnExpandedHtml(arrayItem, pageHtml);
            }
        });
    }

    $('.main-container').html(pageHtml);

    if (!newButtonClicked) {
        listeners.attachFilterBookmarks();
    }
}

const displayOptions = function () {
    let displayOptions = `<div class="button-options">
            <div><button class="add-bookmark" type="button">+ New <i class="far fa-bookmark"></i></button></div>
            <div>
            <label for="filter-rating">Minimum Filter:</label>
            <select name="filter-rating" id="filter-rating">
                <option value="5">5</option>
                <option value="4">4 or higher</option>
                <option value="3">3 or higher</option>
                <option value="2">2 or higher</option>
                <option value="1">1</option>
            </select>
            </div>
        </div>`

    return displayOptions;
}

const displayUnExpandedHtml = function (arrayItem, pageHtml) {
    let titleHtml = `<div class='item-container'><ul><li class='bookmark-list-item' data-item-id='${arrayItem.id}'>${arrayItem.title}</li></ul>`
    let starContainerStart = `<div class="star-container">`;
    let starsHtml = '';
    let rating = arrayItem.rating;
    for (let i = 0; i < rating; i++) {
        let starHtml = `<div class='display-star'><i class="fas fa-star"></i></div>`
        starsHtml = starsHtml + starHtml;
    }
    let starContainerEnd = `</div></div>`;

    // this is entire thing is an item:
    // <li>title</li>
    // <div class="star-container">
    //  ...starHtml
    // </div>
    let itemHtml = `${titleHtml}${starContainerStart}${starsHtml}${starContainerEnd}`;
    pageHtml = pageHtml + itemHtml;

    return pageHtml
}

const filterBookmarks = function () {
    let selectedVal = $('#filter-rating').find(':selected').val();
    let numVal = Number(selectedVal);
    console.log(numVal);
    let arrayItems = arrayItem.store.bookmarks;
    let matchedItems = arrayItems.filter(function (bookmark) { return bookmark.rating >= numVal });
    return matchedItems;
}

const bindEventListeners = function () {
    listeners.attachNewButtonClick();
    listeners.attachBookMarkSelectionClick();
}

export default {
    render,
    bindEventListeners,
}