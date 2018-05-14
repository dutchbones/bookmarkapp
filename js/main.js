// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    validateForm(siteName, siteUrl);

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null){
        // init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    // re-fetch bookmarks
    fetchBookmarks();
    // prevent form from submitting
    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url) {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for (i=0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // re-fetch bookmarks
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    // build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="well">' +
        '<h3>' + name +
        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +

        '</h3>' +
        '</div>';
    }
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        showMessage('Please enter Website Name and URL', 'alert-danger');
        return false;
    }

    var expression = /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        showMessage('Please enter valid URL', 'alert-danger');
        return false;
    }
}

function showMessage(message, className) {
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const jumbotron = document.querySelector('.jumbotron');
    // get myForm
    const myForm = document.getElementById('myForm');
    // insert message
    jumbotron.insertBefore(div, myForm);
    // timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
}