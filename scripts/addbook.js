import arrayItem from './store.js';
import init from './initpg.js';

const displayAddBookmark = function (pageHtml) {
    let addBookMarkpgHtml = `<form class="bookmark-form">
        <div><label for="name">Add New Bookmark:</label>
        <input type="url" id="input-bookmark" name="input-bookmark" size="22">
        </div>
        <div>
        <label for="name">Title:</label>
        <input type="text" id="input-bookmark-title" name="input-bookmark-title" size="22">
        </div>
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
            let newId = makeid(4);
            let newRating = $("input[name='rating']:checked").val();
            let numRating = Number(newRating);
            
            console.log(urlInput);
            console.log(titleInput);
            console.log(textInput);

            let newItem = createItem(urlInput, titleInput, textInput, newId, numRating);
            console.log(newItem);

            arrayItem.store.bookmarks.push(newItem);
            console.log(arrayItem.store.bookmarks);

            init.render();
        });
    })
}


const createItem = function (urlInput, titleInput, textInput, newId, numRating) {
    let newItem = {}

    newItem.id = newId;
    newItem.title = titleInput;
    newItem.rating = numRating;
    newItem.url = urlInput;
    newItem.description = textInput;
    newItem.expanded = false;

    return newItem;
}

function makeid(l) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
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


