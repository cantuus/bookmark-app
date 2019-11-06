

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

const attachCreateButtonClick = function () {

}

const createBookmark = function () {

}

const attachCancelButtonClick = function () {
    $(document).ready(function () {
        $('.cancel-button').click(main.render());
    })
}

export default {
    attachCancelButtonClick,
    attachCreateButtonClick,
    createBookmark,
    displayAddBookmark
}


