document.addEventListener("DOMContentLoaded", function() {

const url = 'http://localhost:3000/books';
fetch(url)
  .then(res => res.json())
  .then(booksJson => {
    for(const book of booksJson) {
      addBookToDOM(book);
    }
  })
});

function addBookToDOM(bookObj) {
    const arrayOfUsers =  bookObj.users
    const listItem = document.getElementById('list');
    const li = document.createElement('li');
    li.textContent = bookObj.title;

    li.addEventListener('click', e => {
    //    e.currentTarget
       const title = document.createElement('h2')
       const description = document.createElement('p')
       const img = document.createElement('img')
       const btn = document.createElement('button')
       const usersList = document.createElement('ul')
       usersList.classList.add('username-list')
       
       title.innerText = bookObj.title
       description.innerText = bookObj.description
       img.src = bookObj.img_url
       btn.textContent = "Like Book"
        btn.addEventListener('click', e => {
            e.preventDefault();
            bookObj.users.push({"id":1, "username":"pouros"})
            const usersUrl = `http://localhost:3000/books/${bookObj.id}`
            const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
            "users": bookObj.users
                // should the body append the users reading the book
            })
            };
    
        fetch(usersUrl, options) //pull up & ordering
          .then(res => res.json()) // cashier ringing order up (anything interim - something but not edible)
          .then(book => { //being served
            for (const bookUser of arrayOfUsers){

                const usernameLi = document.createElement('li')
                usernameLi.textContent = `${bookUser.username}`
            
                usersList.append(usernameLi)
               } //eat it
            //   debugger

          });
    debugger

      });

       for (const bookUser of arrayOfUsers){
        const usernameLi = document.createElement('li')
        usernameLi.textContent = `${bookUser.username}`
    
        usersList.append(usernameLi)
       }
       const bookPanel = document.getElementById('show-panel')
       bookPanel.innerHTML = ''
       bookPanel.append(title,img,description,usersList, btn)
    //   usersList.append(title,img,description,btn)

      });

    listItem.append(li);
    
  }

// You can like a book by clicking on a button. 
// You are user 1 {"id":1, "username":"pouros"}, 
// so to like a book send a PATCH request to 
// http://localhost:3000/books/:id with an array of users who like the book. 
// This array should be equal to the existing array of users that like the book, 
// plus your user. For example, if the previous array was
//  "[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}], 
//  you should send as the body of your PATCH request:
// {
//     "users": [
//       {"id":2, "username":"auer"},
//       {"id":8, "username":"goodwin"},
//       {"id":1, "username":"pouros"}
//     ]
//   }
// This route will respond with the updated book json including the list of users who have liked the book.
// BONUS: Can you make it so a second patch request to the same book removes your user from the list of users? 
// Can you toggle likes on and off?