import arrayItem from './store.js';

//step 1
const render = function () {
    let arrayItems = arrayItem.store.bookmarks;
    let pageHtml = '';

    arrayItems.forEach(function (arrayItem) {
        if (arrayItem.expanded === true) {
            let expandedHtml = 
                `<section class="bookmark-container">
                    <ul class="bookmark-list">
                        <li class='bookmark-list-item' data-item-id='${arrayItem.id}'>${arrayItem.title}</li>
                        <button class="delete-bookmark"><i class="far fa-trash-alt"></i></button>
                        <a href='${arrayItem.url}'><button class="visit-site-bookmark">Visit Site</button></a>
                        <p>${arrayItem.description}
                        </p>
                    </ul>
                </section>`;
            pageHtml = pageHtml + expandedHtml;
        }
        else {
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
        }
    });

    // render fucking everything
    $('.bookmark-container').html(pageHtml);

    // attach event listeners
    attachNewButtonClick();
    attachBookMarkSelectionClick();
}
//step 2 attach event listener to new button
const attachNewButtonClick = function() {
    $(document).ready(function () {
        $('.add-bookmark').click(displayAddBookmark);
    })
}

//re-render to the add bookmark page
const displayAddBookmark = function () {
    let addBookMarkpgHtml = `<form class="bookmark-form">
        <label for="name">Add New Bookmark:</label>
        <input type="url" id="input-bookmark" name="input-bookmark" required minlength="4" maxlength="8" size="22">
        <div class="edit-container-header">
            <h3>Link Walkthrough</h3>
            <div class="star-container">
                <div id="starOne"><i class="far fa-star"></i></div>
                <div id="starTwo"><i class="far fa-star"></i></div>
                <div id="starThree"><i class="far fa-star"></i></div>
                <div id="starFour"><i class="far fa-star"></i></div>
                <div id="starFive"><i class="far fa-star"></i></div>
            </div>
            <button class="edit-button" type="button"><i class="far fa-edit"></i></button>
        </div>
        <div class="edit-container">
            <textarea rows="9" cols="60" placeholder="Add a description..."></textarea>
            <button class="cancel-button">Cancel</button>
            <button class="create-button">Create</button>
        </div>
    </form>`

    $('.button-options').html(addBookMarkpgHtml);
}
// step 3 attach event listener to bookmark selection items
const attachBookMarkSelectionClick = function() {
    $(document).ready(function () {
        $('.bookmark-container').on('click', '.bookmark-list-item', event => updateExpandedValue(event))
    })
}

// updates the expanded value of the store 
const updateExpandedValue = function (event) {
    const id = getItemIdFromElement(event.currentTarget);
    let foundItem = getItem(id);
    foundItem.expanded = !foundItem.expanded;
    render();
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
    return foundItem
}



$(render);