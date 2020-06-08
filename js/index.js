document.addEventListener("DOMContentLoaded", function() {

});
const booklist = document.getElementById("list")
const bookShow = document.getElementById("show-panel")
const bookUrl = "http://localhost:3000/books"

    fetch(bookUrl)
        .then(res => res.json())
        .then (function (books) {
            for(const book of books){
                addbook(book)     
            }
            
            })
  
   


function addbook(bookObj) {
const addli = document.createElement("li")
const title = document.createElement("p")
const bookId = document.createElement("p")
bookId.setAttribute("type", "hidden");
bookId.setAttribute("id", bookObj.id)
title.dataset.bookId = bookObj.id;
title.innerText = bookObj.title //<<<<
title.addEventListener('click', ()=>{
    
    showBookpage(bookObj)
    
})
booklist.append(addli)
addli.append(title,bookId)
}

function showBookpage(obj) {
    bookShow.innerHTML = ''
    const addtitle = document.createElement("h2")
    const adddes = document.createElement("p")
    const addimg = document.createElement("img")
    
    addtitle.innerText = obj.title
    adddes.innerText = obj.description
    addimg.src = obj.img_url
    bookShow.append(addtitle,adddes,addimg)
    for(const user of obj.users){
    const adduser = document.createElement("li")
    adduser.innerText = user.username
    bookShow.append(adduser)}
    const addbutton = document.createElement("BUTTON")
    addbutton.innerText = "Read Book"
    bookShow.append(addbutton)
    const usersArray = obj.users;
    const currentUser = {"id":1, "username":"pouros"};
    if (!usersArray.find(user => user.id === currentUser.id)) {
        usersArray.push(currentUser);
      }
    const readbook = document.querySelector("button")
    
    readbook.addEventListener("click", e => {
        // const bookId = e.target.obj.id;
        const options = {
        method: "PATCH",
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            users: usersArray
    
        })
        
    }
        fetch(`${bookUrl}/${obj.id}`,options)
        .then(res => res.json())
        .then(book => {
            showBookpage(book)
        })
    })
    
    return readbook
    }

    function rendershowpage(){
fetch(bookUrl)
.then(res => res.json())
.then (function (books) {
    for(const book of books)
    showBookpage(book)
})
}




