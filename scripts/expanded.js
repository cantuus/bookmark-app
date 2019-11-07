import listeners from './eventlistener.js';
import arrayItem from './store.js';
import init from './initpg.js';

const displayExpandedHtml = function (arrayItem, pageHtml) {
    let expandedHtml =
        `<div class="item-container" id="expanded">
                    <div id="title-delete-button" data-item-id='${arrayItem.id}'><li class='bookmark-list-item' data-item-id='${arrayItem.id}'>${arrayItem.title}</li>
                    <button class="delete-bookmark"><i class="far fa-trash-alt"></i></button></div>
                    <div><a href='${arrayItem.url}'><button class="visit-site-bookmark">Visit Site</button></a></div>
                    <p>${arrayItem.description}
                    </p>
                </div>`;

    attachDeleteButton();

    pageHtml = pageHtml + expandedHtml;
    return pageHtml;
}

const attachDeleteButton = function () {
    $(document).ready(function () {
        $('.item-container').on('click', '.delete-bookmark', function (event) {
            const id = listeners.getItemIdFromDeleteElement(event.currentTarget);
            let newStore = arrayItem.store.bookmarks.filter(function (item) {
                return item.id !== id;
            })
    
            arrayItem.store.bookmarks = newStore
            $(this).parent().remove();
            init.render();
        });
    });
}



export default {
    displayExpandedHtml,
    attachDeleteButton
}
