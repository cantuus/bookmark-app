import arrayItem from './store.js';

const init = function () {
    let arrayItems = arrayItem.store.bookmarks;
    arrayItems.forEach(function (arrayItem) {
        let titleHtml = `<div class='item-container'><li class='bookmark-list-item' id='${arrayItem.id}'>${arrayItem.title}</li>`
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

        $('.bookmark-container').append(itemHtml);
    });

}

$(init);