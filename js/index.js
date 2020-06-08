// document.addEventListener("DOMContentLoaded", function() {});

const url =  `http://localhost:3000/books`

// MAke a menu of list items that are clickable, one LI per book
fetch(url)
    .then(res => res.json())
    .then(books => {
        // debugger
        //populate menu
        for (const book of books){
            makeMenuItem(book);
        }

    });


    function makeMenuItem(book){
        const li = document.createElement('li');

        li.innerText = book.title;
        //indentify which book we're dealing with when clicked
        li.dataset.bookID = book.id;

        const menuUl = document.querySelector('#list');

        menuUl.append(li);

        //put code for showing each book here
        // li.addEventListener('click', () =>{
        //     console.log(book);
        // });
    }


    //be able to click on a book, you should see the book's thumbnail and
    // description and a list of users who have liked the book


    // patch request to `http://localhost:3000/books/:id
    // be able to like a book, add yourself(currentuser) to list of users
    const currentUser = {"id": 1, "username": "pouros"};

    function showBook(book){
    const thumbnail = document.createElement('img');
    thumbnail.src = book.img_url;

    const h2 = document.createElement('h2');
    h2.innerText = book.title;

    const description = document.createElement('p');
    description.innerText = book.description;

    const usersList = document.createElement('ul');
    
    //populate list of users
    for (const user of book.users){
        const li = document.createElement('li');
        li.innerText = user.username;

        usersList.append(li);
    }

    const likeBtn = document.createElement('button');
    likeBtn.innerText = 'Like';

    likeBtn.addEventListener('click', () => {
       const usersArray = book.users; 

       if (!usersArray.find(user => user.id == currentUser.id)){
        usersArray.push(currentUser);

        // debugger 
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json", 
                'Accept': 'application.json'
            },
            body: JSON.stringify({
                users: usersArray
            })
        }


        fetch(`${url}/${book.id}`, options)
            .then(res => res.json())
            .then(book => {
                //update the users in the DOM
                showBook(book);
            })
       }
    });

    // clear the panel and adding book detail
    const showPanel = document.querySelector('#show-panel');
    showPanel.textContent = ' ';
    showPanel.append(thumbnail, h2, description, usersList, likeBtn);
}



    const menuUl = document.querySelector('#list');

    //event delegation: shows the correct book when clicking in the parent UL
    menuUl.addEventListener('click', e => {
        // console.log(e.target.dataset.bookID)
        const bookId = e.target.dataset.bookID;

        fetch(`${url}/${bookId}`)
        .then(res => res.json())
        .then(book => {
            // debugger
            //we need to show the book on the page
            showBook(book);
        });
    });


