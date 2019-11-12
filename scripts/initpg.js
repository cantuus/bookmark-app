import arrayItem from './store.js';
import expanded from './expanded.js';
import addbook from './addbook.js';
import listeners from './eventlistener.js';

const render = function (newButtonClicked) {
    let arrayItems = arrayItem.store.bookmarks;
    let pageHtml = '';

    if (newButtonClicked === true) {
        pageHtml = addbook.displayAddBookmark(pageHtml);
    } 
    else {
        if (arrayItem.store.filter) {
            arrayItems = filterBookmarks();
        }

        let buttonOptions = displayOptions();
        pageHtml = '' + buttonOptions;

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
    let selectedVal = arrayItem.store.filter;
    let optionStart = `<div class="button-options">
            <div><button class="add-bookmark" type="button">+ New <i class="far fa-bookmark"></i></button></div>
            <div>
            <label for="filter-rating">Minimum Filter:</label>
            <select name="filter-rating" id="filter-rating">
                <option value="">---</option>`;

    let option5 = `<option value="5">5</option>`;
    if (selectedVal === 5) {
        option5 = `<option value="5" selected>5</option>`;
    }
    let option4 = `<option value="4">4 or higher</option>`;
    if (selectedVal === 4) {
        option4 = `<option value="4" selected>4 or higher</option>`;
    }
    let option3 = `<option value="3">3 or higher</option>`;
    if (selectedVal === 3) {
        option3 = `<option value="" selected>3 or higher</option>`;
    }
    let option2 = `<option value="2">2 or higher</option>`;
    if (selectedVal === 2) {
        option2 = `<option value="2" selected>2 or higher</option>`;
    }
    let option1 = `<option value="1">1 or higher</option>`;
    if (selectedVal === 1) {
        option1 = `<option value="1" selected>1 or higher</option>`;
    }

    const optionEnd = `</select></div></div>`;

    return `${optionStart}${option5}${option4}${option3}${option2}${option1}${optionEnd}`;
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
    let arrayItems = arrayItem.store.bookmarks;
    let matchedItems = arrayItems.filter(function (bookmark) { return bookmark.rating >= arrayItem.store.filter });
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