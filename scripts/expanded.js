import listeners from './eventlistener.js'

const displayExpandedHtml = function (arrayItem, pageHtml) {
    let expandedHtml =
        `<div class="item-container" id="expanded">
                    <div id="title-delete-button" data-item-id='${arrayItem.id}><li class='bookmark-list-item'>${arrayItem.title}</li>
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
        $('.item-container').on('click', '#title-delete-button', function (event) {
            const id = listeners.getItemIdFromElement(event.currentTarget);
            let foundItem = listeners.getItem(id);
            console.log(foundItem);
            $(this).parent().remove();
            console.log('delete-button is clicked');
        });
    });
}



export default {
    displayExpandedHtml,
    attachDeleteButton
}
