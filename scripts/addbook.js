import arrayItem from './store.js';
import init from './initpg.js';
import api from './api.js';

const displayAddBookmark = function (pageHtml) {
    let addBookMarkpgHtml = `<form class="bookmark-form">
        <div><label for="input-bookmark">Add New Bookmark:</label>
        <input type="url" id="input-bookmark" name="input-bookmark" size="22" required>
        </div>
        <div>
        <label for="input-bookmark-title">Title:</label>
        <input type="text" id="input-bookmark-title" name="input-bookmark-title" size="22" required>
        </div>
        <div class="edit-container-header">
            <div class="star-container">
            <div class="rating">
                    <input type="radio" id="star5" name="rating" value="5" required/><label for="star5" title="Rocks!">5 stars</label>
                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
            </div>
            </div>
        </div>
        <div class="edit-container">
            <div><label for="input-bookmark-text">Description:</label></div>
            <textarea type="text" id="input-bookmark-text" rows="9" cols="60" placeholder="Add a description..."></textarea>
            <div class="edit-button-container">
                <input type="submit" class="create-button"></input>
                <button type="button" class="cancel-button">Cancel</button>
            </div>
        </div>
    </form>`;

    attachCreateButtonClick();
    attachCancelButtonClick();
    
    pageHtml = addBookMarkpgHtml;
    return pageHtml;

}

const attachCreateButtonClick = function () {
    $(document).ready(function () {
        $('.bookmark-form').submit(function (event) {
            event.preventDefault();
            console.log('create button worked');
            let urlInput = $('#input-bookmark').val();
            let titleInput = $('#input-bookmark-title').val();
            let textInput = $('#input-bookmark-text').val();
            let newRating = $("input[name='rating']:checked").val();
            let numRating = Number(newRating);

            console.log(urlInput);
            console.log(titleInput);
            console.log(textInput);

            let newItem = createItem(urlInput, titleInput, textInput, numRating);
            console.log(newItem);

            api.createBookmark(newItem).then(function (response) {
                arrayItem.store.bookmarks.push(response);
                console.log(arrayItem.store.bookmarks);
                init.render();
            })
        });
    })
}


const createItem = function (urlInput, titleInput, textInput, numRating) {
    let newItem = {}

    newItem.title = titleInput;
    newItem.rating = numRating;
    newItem.url = urlInput;
    newItem.desc = textInput;
    newItem.expanded = false;

    return newItem;
}



const attachCancelButtonClick = function () {
    $(document).ready(function () {
        $('.cancel-button').click(function () {
            let arrayItems = arrayItem.store.bookmarks;
            arrayItems.forEach(function (item) {
                item.expanded = false;
            })
            console.log('Cancel button clicked!')
            init.render();
        })
    })
}
export default {
    attachCancelButtonClick,
    attachCreateButtonClick,
    displayAddBookmark
}


