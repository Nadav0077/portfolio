'use strict'
var gPageIdx = 0;
var PAGE_SIZE = 5;
var gCurrID = 1;
var STORAGE_KEY = 'booksDB';
var gSortType;
var gBooks;
var gCurrBookInModal;
_createBooks();

function _createBooks() {
    // localStorage.clear();
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || books.length === 0) {
        var bookPicId1 = getRandomIntInclusive(1, 6);
        var bookPicId2 = getRandomIntInclusive(1, 6);
        var bookPicId3 = getRandomIntInclusive(1, 6);
        var books = [{
                id: gCurrID++,
                bookTitle: 'The Hobbit',
                price: 20,
                bookPic: `<img src="img/book${bookPicId1}.png">`,
                bookRate: 0
            },
            {
                id: gCurrID++,
                bookTitle: 'Lord Of The Rings',
                price: 15,
                bookPic: `<img src="img/book${bookPicId2}.png">`,
                bookRate: 0
            },
            {
                id: gCurrID++,
                bookTitle: 'Harry Potter',
                price: 80,
                bookPic: `<img src="img/book${bookPicId3}.png">`,
                bookRate: 0
            }
        ]
        gBooks = books;
        for (var i = 0; i < 15; i++) {
            createNewBook(generateName(), getRandomIntInclusive(1, 100))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}


function removeBook(bookId) {
    var bookIdx = getBookIdxById(bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function getBooksForDisplay() {
    switch (gSortType) {
        case 'id':

            gBooks.sort(function(book1, book2) {
                return book1.id - book2.id;
            });
            break;
        case 'title':
            gBooks.sort(function(book1, book2) {
                var name1 = book1.bookTitle.toLowerCase()
                var name2 = book2.bookTitle.toLowerCase()
                if (name1 > name2) {
                    return 1;
                }
                if (name2 > name1) {
                    return -1;
                }
                return 0;
            });

            break;
        case 'price':

            gBooks.sort(function(book1, book2) {
                return book2.price - book1.price;
            });
            break;
    }
}

function sortTable(sortType) {
    gSortType = sortType;
}



function createNewBook(bookTitle, bookPrice) {
    debugger
    var bookPicId = getRandomIntInclusive(1, 6);
    gBooks.push({
        id: gBooks[getBiggestId()].id + 1,
        bookTitle: bookTitle,
        price: bookPrice,
        bookPic: `<img src="img/book${bookPicId}.png">`,
        bookRate: 0

    })
    _saveBooksToStorage();
}

function getBookIdxById(id) {
    return gBooks.findIndex((book) => {
        return book.id === id
    })
}

function getBiggestId() {
    var max = Math.max.apply(Math, gBooks.map(function(book) { return book.id; }))
    return gBooks.findIndex((book) => {
        return book.id === max
    })
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE)
    return books;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function prevPage() {
    if (gPageIdx !== 0)
        gPageIdx--;
}

function updateBook(title, price) {
    var id = getBookIdxById(gCurrUpdateId);
    gBooks[id].bookTitle = (title) ? title : gBooks[id].bookTitle;
    gBooks[id].price = (price) ? price : gBooks[id].price;
    _saveBooksToStorage();
}

function getBookById(id) {
    return gBooks[getBookIdxById(id)];
}

function updateRate(rate) {
    gBooks[gCurrBookInModal].bookRate = rate;
    _saveBooksToStorage();
}