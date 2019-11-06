const displayExpandedHtml = function (arrayItem, pageHtml) {
    let expandedHtml =
        `<div class="item-container" id="expanded">
                    <div id="title-delete-button"><li class='bookmark-list-item' data-item-id='${arrayItem.id}'>${arrayItem.title}</li>
                    <button class="delete-bookmark"><i class="far fa-trash-alt"></i></button></div>
                    <div><a href='${arrayItem.url}'><button class="visit-site-bookmark">Visit Site</button></a></div>
                    <p>${arrayItem.description}
                    </p>
                </div>`;
    pageHtml = pageHtml + expandedHtml;
    return pageHtml;
}

export default {
    displayExpandedHtml
}