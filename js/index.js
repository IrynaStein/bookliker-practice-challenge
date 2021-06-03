document.addEventListener("DOMContentLoaded", getBooks);

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
    data.map(bookObj => {
        const li = document.createElement('li')
        li.innerText = bookObj['title']
        list.appendChild(li)
        li.addEventListener('click', () => showBookdetails(bookObj))
    })
}

// function userList(bookObj){
//     bookObj['users'].map((user) => {
//         const li = document.createElement('li')
//         li.innerText = user.username
//         
//         usersUl.appendChild(li)
//         return li
//     })
// }

function showBookdetails(bookObj) {
    showPanel.innerHTML = ""
    const title = document.createElement('h2')
    title.innerText = bookObj['title']
    const author = document.createElement('h3')
    author.innerText = bookObj['author']
    const img = document.createElement('img')
    img.src = bookObj['img_url']
    const subtitle = document.createElement('h3')
    subtitle.innerText = bookObj['subtitle']
    const p = document.createElement('p')
    p.innerText = bookObj['description']
    const usersUl = document.createElement('ul')
    bookObj.users.map(user => {
        const userLi = document.createElement('li')
        userLi.innerText = user.username
        usersUl.append(userLi)
        return usersUl;
    })
    showPanel.append(title, img, author, subtitle, p, usersUl)
}



