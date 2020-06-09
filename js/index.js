// document.addEventListener("DOMContentLoaded", function() {});

const url = "http://localhost:3000/books";
fetch(url)
  .then((res) => res.json())
  .then((booksJson) => {
    for (const book of booksJson) {
      addBookToDOM(book);
    }
  });

function addBookToDOM(bookObj) {
  const arrayOfUsers = bookObj.users;
  const listItem = document.getElementById("list");
  const li = document.createElement("li");
  li.textContent = bookObj.title;

  li.addEventListener("click", (e) => {
    //    e.currentTarget
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const img = document.createElement("img");
    const btn = document.createElement("button");
    const usersList = document.createElement("ul");
    usersList.classList.add("username-list");

    title.innerText = bookObj.title;
    description.innerText = bookObj.description;
    img.src = bookObj.img_url;
    btn.textContent = "Like Book";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const usersArray = bookObj.users;
      const currentUser = { id: 1, username: "pouros" };
      if (!usersArray.find((user) => user.id === currentUser.id)) {
        usersArray.push(currentUser);
      }
      const usersUrl = `http://localhost:3000/books/${bookObj.id}`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          users: bookObj.users,
        }),
      };

      fetch(usersUrl, options) //pull up & ordering
        .then((res) => res.json()) // cashier ringing order up (anything interim - something but not edible)
        .then((book) => {
          //being served

          const usernameLi = document.createElement("li");
          usernameLi.textContent = currentUser.username;
          usersList.append(usernameLi);
          //eat it
        });
    });

    for (const bookUser of arrayOfUsers) {
      const usernameLi = document.createElement("li");
      usernameLi.textContent = `${bookUser.username}`;

      usersList.append(usernameLi);
    }
    const bookPanel = document.getElementById("show-panel");
    bookPanel.innerHTML = "";
    bookPanel.append(title, img, description, usersList, btn);
  });

  listItem.append(li);
}
