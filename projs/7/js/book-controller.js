var gIsChecked = false;
var gIsCreateDisplay = false;
var gIsUpdateDisplay = false;
var gCurrUpdateId;

function init() {

    renderBooksTable();
}

function renderBooksTable() {
    getBooksForDisplay();
    var books = getBooks();
    var strHTML = ''
    var idX = 0;
    var elBooksCards = document.querySelector('.book-cards-container');
    var elBooksTable = document.querySelector('.books-table');
    if (!gIsChecked) {
        elBooksCards.style.display = 'none';
        elBooksTable.style.display = 'inline-table';
        strHTML = books.map(function(book) {
            return `<tr>
        <td>${book.id}</td>
        <td>${book.bookTitle}</td>
        <td>${book.price}$</td>
        <td><button onclick="onReadBook(${book.id})" class="read-btn">Read</button></td>
        <td><button onclick="onDisplayUpdateModal(${book.id})" class="update-btn">Update</button></td>
        <td><button onclick="onRemoveBook(${book.id})" class="remove-btn">Delete</button></td>
    </tr>`
        })


        var elTable = document.querySelector('.books-table tbody');
        elTable.innerHTML = strHTML.join('');
    } else {
        elBooksCards.style.display = 'block';
        elBooksTable.style.display = 'none';
        strHTML = books.map(function(book) {
            return `<div class="card">
           ${book.bookPic}
                <h4><b>${book.bookTitle}</b></h4>
                     <ul>
                    <li>Price:<br/>${book.price}$</li>
                    <li>ID:<br/> ${book.id}</li>
                <button onclick="onReadBook(${book.id})" class="read-btn">Read</button>
                <button onclick="onDisplayUpdateModal(${book.id})" class="update-btn">Update</button>
                <button onclick="onRemoveBook(${book.id})" class="remove-btn">Delete</button>
      
        </div>`
            idX++;
        })
        elBooksCards.innerHTML = strHTML.join('');
    }

}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooksTable();
}

function changeDisplay(elSwitch) {
    gIsChecked = elSwitch.checked;
    renderBooksTable();
}

function onCreateNewBook() {
    var elBookTitle = document.querySelector('input[name=bookTitle]');
    var elBookPrice = document.querySelector('input[name=bookPrice]');
    if (elBookTitle.value && elBookPrice.value) {
        createNewBook(elBookTitle.value, elBookPrice.value);
        renderBooksTable();
        elBookTitle.value = '';
        elBookPrice.value = '';
        document.querySelector('.create-book-modal').style.display = 'none';
        gIsCreateDisplay = !gIsCreateDisplay
    }


}

function onDisplayCreateModal() {
    document.querySelector('.create-book-modal').style.display = (gIsCreateDisplay) ? 'none' : 'block';
    gIsCreateDisplay = !gIsCreateDisplay
}

function onSortTable(sortType) {
    sortTable(sortType);
    renderBooksTable();
}

function onNextPage() {
    nextPage();
    renderBooksTable();
}

function onPrevPage() {
    prevPage()
    renderBooksTable();
}

function onCloseModal() {
    document.querySelector('.read-modal').hidden = true
}

function onUpdateBook() {
    debugger
    var elTitle = document.querySelector('input[name=bookTitleUpdate]');
    var elPrice = document.querySelector('input[name=bookPriceUpdate]');
    updateBook(elTitle.value, elPrice.value);
    renderBooksTable();
    elTitle.value = '';
    elPrice.value = '';
    document.querySelector('.update-book-modal').style.display = 'none';
}

function onDisplayUpdateModal(id) {
    if (gCurrUpdateId === id) gIsUpdateDisplay = !gIsUpdateDisplay
    gCurrUpdateId = id;
    document.querySelector('.update-book-modal').style.display = (gIsUpdateDisplay) ? 'none' : 'block';
}

function onReadBook(bookID) {
    gCurrBookInModal = getBookIdxById(bookID)
    var book = getBookById(bookID)
    console.log(book)
    var elModal = document.querySelector('.read-modal')
    elModal.querySelector('.modal-title').innerText = book.bookTitle;
    elModal.querySelector('.modal-img').innerHTML = book.bookPic;
    elModal.querySelector('.modal-price').innerText = 'Price:   ' + book.price + '$';
    elModal.querySelector('.modal-id').innerText = 'ID:   ' + book.id;
    elModal.querySelector('input[name=rateInput]').value = book.bookRate;
    elModal.hidden = false;

}

function onUpdateRate(rate) {
    updateRate(rate);
}