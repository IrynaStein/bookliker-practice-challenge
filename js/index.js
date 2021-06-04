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
    let userNames = []
    bookObj.users.map(user => listUsers(user, usersUl, userNames))

    // bookObj.users.map(user => {
    //     const userLi = document.createElement('li')
    //     userLi.innerText = user.username
    //     usersUl.append(userLi)
    //     userNames.push({
    //         "id": user.id,
    //         "username": user.username
    //     })
    //     return usersUl;
    // })
    console.log(userNames)
    let button = document.createElement('button')
    button.innerHTML = `<id ="like-btn">LIKE`
    showPanel.append(title, img, author, subtitle, p, usersUl, button)
    button.addEventListener('click', () => likeBook(userNames))
}

function listUsers(user, ul, userNames) {
    const userLi = document.createElement('li');
    userLi.innerText = user.username;
    ul.append(userLi)
    userNames.push({
        "id": user.id,
        "username": user.username
    })
    return ul
}

function likeBook() {
    let button = document.querySelector("#show-panel > button > id")
    let me = { "id": 1, "username": "pouros" }
    if (button.innerText === "LIKE") {
        button.innerHTML = "UNLIKE"
        //appned li to the ul
        console.log(`${me.username} liked this book`)
    }
    else {
        button.innerHTML = "LIKE"
        //remove name from the ul
        console.log(`${me.username} unliked this book`)
    }

}
//fetch POST request function
// fetch(http://localhost:3000/books/:id ,{
    //         method: 'PATCH',
    // body: JSON.stringify({ // add userNames object + me object and send it 

    // })
    //     }

