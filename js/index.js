// document.addEventListener("DOMContentLoaded", function() {});
// {
//   id: 1,
//   title: "Picture Perfect",
//   description: "When her seven-year-old nephew, a hemophiliac, mysteriously disappears during their camping trip, pediatrician Lorrie Ryan races against time to find the missing boy with the help of FBI agent Stuart Saunders. Previously published as Panda Bear Is Critical. Reprint.",
//   img_url: "http://books.google.com/books/content?id=CEMZ1OoPDIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//   users: [
//   {
//    id: 2,
//    username: "auer"
//   },
//   {
//    id: 8,
//    username: "goodwin"
//   }
//   ]
//  }
const url = 'http://localhost:4000/books';

fetch(url)
.then(res => res.json())
.then(books => {
    for (const book of books){
        makeMenuItem(book)
    }
});
const currentUser = {"id":1, "username": "pouros" };
function makeMenuItem(book){
    const li = document.createElement('li')
    li.textContent = book.title;
    //Identify which book we are dealing with when clicked
    li.dataset.bookID = book.id;

    const menu = document.querySelector('#list');

    menu.append(li);



}

function showBook(book) {
    const thumbnail = document.createElement('img');
    thumbnail.src = book.img_url;

    const title = document.createElement('h2');
    title.textContent = book.title;

    const description = document.createElement('p');
    description.textContent = book.description;

    const userList = document.createElement('ul');

    for (const user of book.users){
        const li = document.createElement('li');
        li.textContent = user.username;
        userList.append(li);

    }
    

    const likeBtn = document.createElement('button');
    likeBtn.textContent = 'Like';

    likeBtn.addEventListener('click', () => {
        const userArray = book.users;
        if (!userArray.find(user => user.id === currentUser.id)){
            userArray.push(currentUser);
        }
        
        const option = {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },  
            body: JSON.stringify({
                users: userArray
            })
        }
        fetch(`${url}/${book.id}`, option)
        .then(res => res.json())
        .then(book => {
            showBook(book);
        })

    });
    const showPanel = document.querySelector('#show-panel');
    showPanel.textContent = '';
    showPanel.append(thumbnail, title, description, userList, likeBtn);
}

const menu = document.querySelector('#list');

menu.addEventListener('click', e =>{
    const bookID = e.target.dataset.bookID;

    fetch(`${url}/${bookID}`)
    .then(res => res.json())
    .then(book =>{
        showBook(book);
    });
});