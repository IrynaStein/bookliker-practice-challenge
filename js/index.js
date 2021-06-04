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


function showBookdetails(bookObj) {
    showPanel.innerHTML = ""
    const bookId = bookObj['id']
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
    let userNames = []
    bookObj.users.map(user => listUsers(user, usersUl, userNames))
    console.log(userNames)
    let button = document.createElement('button')
    button.innerHTML = `<id ="like-btn">LIKE`
    showPanel.append(title, img, author, subtitle, p, usersUl, button)
    button.addEventListener('click', () => likeBook(userNames, bookId))
}

function listUsers(user, usersUl, userNames) {
    const userLi = document.createElement('li');
    userLi.innerText = user.username;
    usersUl.append(userLi)
    userNames.push({
        "id": user.id,
        "username": user.username
    })
    return usersUl
}

function likeBook(userNames, bookId) {
    let button = document.querySelector("#show-panel > button > id")
    let me = { "id": 1, "username": "pouros" }

    if (button.innerText === "LIKE") {
        button.innerHTML = "UNLIKE"
        userNames.push(me)
        updateUserLikes(bookId, userNames)
        //append li to the ul
        console.log(`${me.username} liked this book`)
    }
    else {
        button.innerHTML = "LIKE"
        userNames.pop()
        //remove name from the ul
        updateUserLikes(bookId, userNames)
        console.log(`${me.username} unliked this book`)
    }
    console.log(userNames)
}
//fetch POST request function

function updateUserLikes(bookId, userNames) {
    return fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            // pass the updated list of users
            "users": userNames
        })   
    })
    .then(resp=>resp.json())
    .then(data => listMyname(data))
}

function listMyname(data){
    const userLi = document.createElement('li');
    userLi.innerText = data.users.slice(-1)[0].username// adding name to the DOM
    document.querySelector("#show-panel > ul").appendChild(userLi) 
}