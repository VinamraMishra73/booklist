let form = document.getElementById("book-form")
let title = document.getElementById("title")
let author = document.getElementById("author")
let isbn = document.getElementById("isbn")
let list = document.getElementById("book-list")

let showbook =[]

list.addEventListener("click",deleteBook)
window.addEventListener("DOMContentLoaded",showDataFromStorage)


form.addEventListener("submit",function(e){
e.preventDefault()
let newtitle = title.value 
//console.log(newtitle)
let newauthor = author.value
let newisbn = isbn.value
if(newtitle == "" || newauthor == "" || newisbn == "" )
alert("Please Enter the Fields")
else{
const obj ={title:newtitle,author:newauthor,isbn:newisbn}
title.value= ""
author.value = ""
isbn.value = ""
showbook.push(obj)
showData(obj)
showAlert("Book Added Successfully","success")
saveData(obj)


}

})

function showData(obj){
    let tbody = document.getElementById("book-list")
    let tr = document.createElement("tr")
  //  console.log("before",tr)
    let row = `
     <td>${obj.title}</td>
     <td>${obj.author}</td>
     <td>${obj.isbn}</td>
     <td><a href="#" class = "btn btn-danger float-right delete">X</a></td>
     `
      tr.innerHTML = row;
      tbody.appendChild(tr)
   //  console.log("after",tr)

}

function deleteBook(e){
if(e.target.classList.contains("delete")){
    if(confirm("Are you sure you want to delete this?")){
      list.removeChild(e.target.parentElement.parentElement)
      showAlert("Book Deleted Successfully","danger")
      removeBook(e.target.parentElement.previousElementSibling.innerHTML)
    }

}

}


function showAlert(msg,className){
  const div = document.createElement("div")
  div.className ="alert alert-"+className
  div.appendChild(document.createTextNode(msg))
  const container = document.querySelector(".container")
const form = document.querySelector("#book-form")
container.insertBefore(div,form)
setTimeout(function(){
  document.querySelector(".alert").remove()
},3000)

}

function saveData(bookObj){
  let book;
  if(localStorage.getItem("books") == null){
    book = []
    book.push(bookObj)
  }else{
    book = JSON.parse(localStorage.getItem("books"))
    book.push(bookObj)
   
  }

  localStorage.setItem("books",JSON.stringify(book))
}
  
function showDataFromStorage(){
const data =  JSON.parse(localStorage.getItem("books"))
data.forEach(function(anything){
  showData(anything)

})
}

function removeBook(isbn){
let books = JSON.parse(localStorage.getItem("books"))
books.forEach(function(kitab){
if(kitab.isbn == isbn){
  books.splice(index,1)
}
})
localStorage.setItem("books",JSON.stringify(books))
}
  
  
