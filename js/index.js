
//  document.addEventListener("DOMContentLoaded", function() {});
//  used defer convention instead of ^ this above

// Assignment deliverables:
// 1. GET request for books, render them, display their info properly in HTML.
// 2. Like a book (PATCH request)


// Make get request for books and display them to index
// fetch for get request

const url = 'http://localhost:3000/books';
const userUrl = 'http://localhost:3000/users/1'
const list = document.getElementById("list");
const bookDisplay = document.getElementById("show-panel");

//set current_user to user with ID == 1
let current_user = null;
fetch(userUrl)
    .then(res => res.json())
    .then(userJson => {
        current_user = userJson
    })



bookDisplay.style.display = "none";

// Showing books
fetch(url)
    .then(res => res.json())
    .then(booksJson => {
        //iterate books object for each book
        console.log(booksJson)
        for(const book of booksJson){
            makeBook(book);
        }
    })

// Function for making book button 
function makeBook(bookObj){
    const li = document.createElement('li');

    li.textContent = bookObj.title;

    list.append(li);
    li.addEventListener("click", () => {
        bookDisplay.style.display = "block"
        displayBook(bookObj)
    })
}

// Function for displaying book info on panel
function displayBook(bookObj){
    //reset the display div every time func is called
    bookDisplay.innerHTML = "";

    //create elements
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const desc = document.createElement('p');
    const usersUl = document.createElement("ul");

    // set elements to Object's values
    title.textContent = `Title: ${bookObj.title}`;
    img.src = bookObj.img_url;
    desc.textContent = bookObj.description;

    // populate usersUl with LIs generated from users object in bookObj
    for(const user of bookObj.users){
        let li = document.createElement("li")
        li.textContent = user.username
        usersUl.append(li)
    }

    // make the button :)
    const button = document.createElement("button");
    button.textContent = "Like This Book";
    let array = bookObj.users;


    //make event listener for button functionality
    button.addEventListener('click', e => {
        e.preventDefault();
        if(current_user in array){
            //delete user from array
            array.pop()
            //setting patch request
            const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                 "Accept": "application/json"
            },
            body: JSON.stringify({
                //we only want to patch users Object
                users: array
            })
            };
            //fetch request to patch
            fetch(`${url}/${bookObj.id}`, options)
            //delete the li in DOM with current_user
            // usersUl.removeChild()
        }
        else{
            //add curren_user to array
            array.push(current_user);
            //setting patch request
            const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                //we only want to patch users Object
                users: array
            })
            };
            //fetch request to patch
            fetch(`${url}/${bookObj.id}`, options)
            //place new li
            let liNew = document.createElement("li");
            liNew.textContent = current_user.username
            usersUl.append(liNew);
        }
    })

    // append those bad boys
    bookDisplay.append(title, img, desc, usersUl, button);
}

// 1: {id: 2, title: "Nemesis", description: "The next high-octane thriller in the FBI series fe…re lives are in danger with every passing minute.", img_url: "http://books.google.com/books/content?id=pkwCDAAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(3)}
// 2: {id: 3, title: "Urban Outlaws", description: "Living life off the radar can be tough - as the Ur…al new series of high-octane, high-tech thrillers", img_url: "http://books.google.com/books/content?id=xTSmAgAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(2)}
// 3: {id: 4, title: "The Kill", description: "When the man she had helped convict of the rape an…ective Zack Travis to stop the monster. Original.", img_url: "http://books.google.com/books/content?id=S3yODQAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(2)}
// 4: {id: 5, title: "Payback", description: "FIGHTING TO SURVIVE Nia Sharpe never expected to g…finding love in the mountains of Washington State", img_url: "http://books.google.com/books/content?id=bNYgCgAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(3)}
// 5: {id: 6, title: "Whispers", description: "When her father decides to run for governor of Ore…rnalist with a grudge, who threatens to tell all.", img_url: "http://books.google.com/books/content?id=TmocdXScY…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(2)}
// 6: {id: 7, title: "Iron Lake", description: "Includes excerpt of Heaven's Keep by William Kent Krueger (p. [439-447]).", img_url: "http://books.google.com/books/content?id=nSEVSnb8w…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(2)}
// 7: {id: 8, title: "The Billionaires", description: "100 Shades of Sin... In The Billionaires, Calista …arts' desire, in The Billionaires by Calista Fox.", img_url: "http://books.google.com/books/content?id=dZs0DgAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(3)}
// 8: {id: 9, title: "Rocky Mountain Pursuit", description: "IDENTITY: CONFIDENTIAL Everyone believes agent Jas…rado mountains, will it become his final mission?", img_url: "http://books.google.com/books/content?id=hmbACwAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(3)}
// 9: {id: 10, title: "The Lottery Winner", description: "Five short tales, including 'Plumbing for Willy' a…leaning woman and her occasionally befuddled mate", img_url: "http://books.google.com/books/content?id=dK5Gx6vbV…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", users: Array(2)}
// length: 10
// __proto__: Array(0)

// Users Object JSON
// [
//     {
//       "id": 1,
//       "username": "pouros"
//     },
//     {
//       "id": 2,
//       "username": "auer"
//     },
//     {
//       "id": 3,
//       "username": "marvin"
//     },
//     {
//       "id": 4,
//       "username": "batz"
//     },
//     {
//       "id": 5,
//       "username": "king"
//     },
//     {
//       "id": 6,
//       "username": "steuber"
//     },
//     {
//       "id": 7,
//       "username": "steuber"
//     },
//     {
//       "id": 8,
//       "username": "goodwin"
//     },
//     {
//       "id": 9,
//       "username": "nikolaus"
//     },
//     {
//       "id": 10,
//       "username": "macejkovic"
//     }
//   ]