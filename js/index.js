// document.addEventListener("DOMContentLoaded", function() {});

const divList = document.querySelector('#list-panel')
const ulList = document.querySelector('#list')
const divShow = document.querySelector('#show-panel')
const url = 'http://localhost:3000/books'
fetch(url)
.then(res => res.json())
.then(books => {
  for(const book of books){
    getBooks(book)
  }
})

function getBooks(book){
  const liBook = document.createElement('li')
  const h3Title = document.createElement('h3')
  h3Title.innerText = book.title
  
  liBook.append(h3Title)
  ulList.append(liBook)

  liBook.addEventListener('click', () => {

    divShow.innerHTML = ''

    const h2Title = document.createElement('h2')
    const pDesc = document.createElement('p')
    const imgBook = document.createElement('img')
    const usersBook = document.createElement('ul')
    const btnFovor = document.createElement('button')
    
    h2Title.innerText = book.title
    pDesc.innerText = book.description
    imgBook.src = book.img_url
    btnFovor.innerText = 'Add Favor User'

    btnFovor.addEventListener('click',() => {
      user = {"id":1, "username":"pouros"}

      book.users.push(user)
      let userBook = document.createElement('li')
      userBook.innerText = `${user["username"]}`      
      usersBook.append(userBook)

    })

    for(let user of book.users){
      let userBook = document.createElement('li')
      userBook.innerText = `${user["username"]}`      
      console.log(user)
      usersBook.append(userBook)
    }
    
    divShow.append(h2Title, pDesc, imgBook, usersBook, btnFovor)

  })

}
  
  