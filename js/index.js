document.addEventListener("DOMContentLoaded", function () { });

const listPanel = document.querySelector("#list-panel")
const list = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

const booksURL = 'http://localhost:3000/books'

function getBooks() {
    return fetch(booksURL)
        .then(resp => resp.json())
        .then(data => renderBooks(data));
}

function renderBooks(data) {
    data.map(bookObj => console.log(bookObj))
}
