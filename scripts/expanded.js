import arrayItem from './store.js';

const init = function () {
    let arrayItems = arrayItem.store.bookmarks;
    arrayItems.forEach(function (arrayItem) {
        if (arrayItem.expanded === true) {
            let itemHtml = `<li class='bookmark-list-item' id='${arrayItem.id}'>${arrayItem.title}</li>
        <button class="delete-bookmark"><i class="far fa-trash-alt"></i></button>
        <a href='${arrayItem.url}'<button class="visit-site-bookmark">Visit Site</button></a>
        <p>${arrayItem.description}</p>`

            $('.bookmark-container').append(itemHtml);
        }

        if(arrayItem.expanded === false){
            let itemHtml = `<li class='bookmark-list-item' id='${arrayItem.id}'>${arrayItem.title}</li>`

            $('.bookmark-container').append(itemHtml);
        }

    });

}

$(init);