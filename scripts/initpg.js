import arrayItem from './store.js';

//step 1

const render = function (newButtonClicked, selectOptionClicked) {
    let arrayItems = arrayItem.store.bookmarks;
    let pageHtml = '';

    if (newButtonClicked === true) {
        pageHtml = displayAddBookmark(pageHtml);
    } else {
        let buttonOptions = displayOptions();
        pageHtml = '' + buttonOptions;
    
        if(selectOptionClicked === true){
            arrayItems = filterBookmarks();
        }
    
        arrayItems.forEach(function (arrayItem) {
            if (arrayItem.expanded === true) {
                pageHtml = displayExpandedHtml(arrayItem, pageHtml);
            }
            else if (arrayItem.expanded === false) {
                pageHtml = displayUnExpandedHtml(arrayItem, pageHtml);
            }
        });
    }

    // render everything
    $('.main-container').html(pageHtml);

    if (!newButtonClicked) {
        attachFilterBookmarks();
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

const displayExpandedHtml = function (arrayItem, pageHtml) {
    let expandedHtml =
        `<div class="item-container">
                    <li class='bookmark-list-item' data-item-id='${arrayItem.id}'>${arrayItem.title}</li>
                    <button class="delete-bookmark"><i class="far fa-trash-alt"></i></button>
                    <a href='${arrayItem.url}'><button class="visit-site-bookmark">Visit Site</button></a>
                    <p>${arrayItem.description}
                    </p>
                </div>`;
    pageHtml = pageHtml + expandedHtml;
    return pageHtml;
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
//step 2 attach event listener to new button
const attachNewButtonClick = function () {
    $(document).ready(function () {
        $('.main-container').on('click', '.add-bookmark', event => {
            event.preventDefault();
            render(true);
        });
    })
}

//re-render to the add bookmark page
const displayAddBookmark = function (pageHtml) {
    let addBookMarkpgHtml = `<form class="bookmark-form">
        <label for="name">Add New Bookmark:</label>
        <input type="url" id="input-bookmark" name="input-bookmark" size="22">
        <div class="edit-container-header">
            <div class="star-container">
            <div class="rating">
                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
            </div>
            </div>
            <button class="edit-button" type="button"><i class="far fa-edit"></i></button>
        </div>
        <div class="edit-container">
            <textarea rows="9" cols="60" placeholder="Add a description..."></textarea>
            <div class="edit-button-container">
                <button class="create-button">Create</button>
                <button class="cancel-button">Cancel</button>
            </div>
        </div>
    </form>`;

    pageHtml = addBookMarkpgHtml;
    return pageHtml;

    //$('.main-container').html(addBookMarkpgHtml);
    //addbooktools.attachCancelButtonClick();
    //$('.bookmark-container').hide();
}
// step 3 attach event listener to bookmark selection items
const attachBookMarkSelectionClick = function () {
    $(document).ready(function () {
        $('.main-container').on('click', '.bookmark-list-item', event => {
            event.preventDefault();
            updateExpandedValue(event);
        })
    })
}

// updates the expanded value of the store that toggles
const updateExpandedValue = function (event) {
    const id = getItemIdFromElement(event.currentTarget);
    let foundItem = getItem(id);
    foundItem.expanded = !foundItem.expanded;
    render(false);
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

const attachFilterBookmarks = function () {
    $(document).ready(function () {
        $('#filter-rating').change(function (event) {
            event.preventDefault;
            render(false, true);
        })
    })
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
    attachNewButtonClick();
    attachBookMarkSelectionClick();
}

export default {
    render,
    bindEventListeners
}