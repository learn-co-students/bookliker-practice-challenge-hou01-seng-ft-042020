// document.addEventListener("DOMContentLoaded", function() {});
const booksUrl = "http://localhost:3000/books";
const bookList = document.getElementById("list");
const showPanel = document.getElementById("show-panel");
let unlike = false;

fetch(booksUrl)
.then(res => res.json())
.then(books => {
    books.forEach(book => {
        renderBook(book);
    });
});

function renderBook(book) {
    const li = document.createElement("li");
    li.innerText = book.title;
    bookList.append(li);
    li.addEventListener("click", e => {
        e.preventDefault;
        showBook(book);
    });
};

function bookUsers(book) {
    book.users.push({"id": 1,"username": "pouros"})
    book.users.forEach(user => {
        console.log({"id": user.id, "username": user.username})
    })
    console.log(book.users)
    debugger
    return book.users
}

function removeUser(book) {
    bookUsers(book).pop()
    return book.users
}

function showBook(book) {
    showPanel.innerText = "";

    const title = document.createElement("h2");
    title.innerText = book.title;

    const image = document.createElement("img");
    image.src = book.img_url;

    const p = document.createElement("p");
    p.innerText = book.description;

    const userH4 = document.createElement("h4");
    userH4.innerText = "Users";
    const userUl = document.createElement("ul");
    book.users.forEach(user => {
        const userLi = document.createElement("li");
        userLi.innerText = user.username;
        userUl.append(userLi);
    });



    const btn = document.createElement("button");
    btn.innerText = "Read Book";

    const unLikeBtn = document.createElement("button");
    unLikeBtn.innerText = "Unlike";
    unLikeBtn.style.display = "none";

    // function showLike() {
    //     if (unlike) {
    //         unLikeBtn.style.display = "block";
    //     } else {
    //         unLikeBtn.style.display = "none";
    //     }
    // };

    btn.addEventListener("click", e => {

        e.preventDefault;
        if (book.users.some(user => user.username === "pouros")) {
            alert("You read this book already!")
            unLikeBtn.style.display = "block";
            // unlike = true;
        } else {
            // unlike = false;
            fetch(`${booksUrl}/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    users: bookUsers(book)
                })
            })
            .then(res => res.json())
            .then(book => {
                userUl.innerText = ""
                book.users.forEach(user => {
                    const userLi = document.createElement("li");
                    userLi.innerText = user.username;
                    userUl.append(userLi);
                });
            });    
        }
    });

    showPanel.append(title, image, p, userH4, userUl, btn, unLikeBtn);
};