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
            else if (arrayItem.expanded === false) {
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
            <button class="add-bookmark" type="button">+ New <i class="far fa-bookmark"></i></button>
            <select name="filter-rating" id="filter-rating">
                <option value="">Filter by Minimum Rating:</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
            </select>
        </div>`

    return displayOptions
}

const displayUnExpandedHtml = function (arrayItem, pageHtml) {
    let titleHtml = `<div class='item-container'><li class='bookmark-list-item' data-item-id='${arrayItem.id}'>${arrayItem.title}</li>`
    let starContainerStart = `<div class="star-container">`;
    let starsHtml = '';
    let rating = arrayItem.rating;
    for (let i = 0; i < rating; i++) {
        let starHtml = `<div class='display-star'><i class="far fa-star"></i></div>`
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
    let matchedItems = arrayItems.filter(function (bookmark) { return bookmark.rating === numVal });
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