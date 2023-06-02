//Consts definition zone
const add = document.getElementById("addBook");
const form = document.getElementById("form");
const search= document.getElementById("search");
const searchResults = document.getElementById("searchResults");
const cancel= document.getElementById("cancel");


// Events zone
add.addEventListener("click",() => {noneToFlex(form)});
search.addEventListener("click", () => {
    noneToFlex(searchResults);
    getSearchResult();
});
cancel.addEventListener("click", ()=>{
    location.reload();
})

//functions zone
function noneToFlex(elementToFlex){
    elementToFlex.style.display="flex";
}


//Get books from API
async function getSearchResult(){

    const keyWordTitle= document.getElementById("bookTitle").value;
    const keyWordAuthor= document.getElementById("author").value;
     
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}`);
    const books = await response.json()
        .then(books => addResultsInHtml(books));
}

function addResultsInHtml(books){

    if (books.totalItems === 0){
        const noResult = document.getElementById("no-result");
        const message = document.createElement("h2");
        message.innerText = "Aucun livre n'a été trouvé";

        noResult.appendChild(message);
    }

    let sectionBook = document.getElementById("books-result");

    for (let i = 0; i< books.items.length; i ++){

        const book = books.items[i];

        const bookMarkElement = document.createElement("i");
        bookMarkElement.setAttribute("style","align-self: flex-end;");
            if(sessionStorage.getItem(book.id)){
                bookMarkElement.setAttribute("class","fa-solid fa-bookmark");
            }else{
                bookMarkElement.setAttribute("class","fa-regular fa-bookmark");
                bookMarkElement.setAttribute("onclick",`addToMyList(${JSON.stringify(book)})`);
            }
        
        const bookElement = createElements(book,bookMarkElement);
            
        sectionBook.appendChild(bookElement);
    }
}

function createElements(book, iconElement){

    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const titleBook = document.createElement("h2"); 
    titleBook.innerText = "Titre: " + book.volumeInfo.title;

    const idBook = document.createElement("p");
    idBook.innerText = "Id: " + book.id;

    const authorBook = document.createElement("p");
    authorBook.innerText = "Auteur: " + book.volumeInfo.authors[0];

    const descriptionBook = document.createElement("p");
    descriptionBook.innerText = book.volumeInfo.description == undefined ? "Description: Information manquante" : ("Description: " + book.volumeInfo.description).substring(0,200);

    const imgBook = document.createElement("img");
    imgBook.classList.add("book__img");
    imgBook.src = book.volumeInfo.imageLinks == undefined ? "assets/unavailable.png" : book.volumeInfo.imageLinks.thumbnail;

    bookElement.appendChild(iconElement);
    bookElement.appendChild(titleBook);
    bookElement.appendChild(idBook);
    bookElement.appendChild(authorBook);
    bookElement.appendChild(descriptionBook);
    bookElement.appendChild(imgBook);

    return bookElement;
}

//add a book in the sessionStorage
function addToMyList(book){

    if (sessionStorage.getItem(book.id)){
        alert ("Vous ne pouvez ajouter deux fois le même livre");
    } else {
    sessionStorage.setItem(`${book.id}`,JSON.stringify(book));
    displayMyList();
    }
}

function getSessionStorage(){
    
    let books = [];
    for(let i = 0; i< sessionStorage.length;i++){
       const response = sessionStorage.getItem(sessionStorage.key(i));
        books.push(JSON.parse(response));
    }
    return books;
}

function displayMyList(){

    const books = getSessionStorage();
    let bookList = document.getElementById("book-list");
    bookList.innerHTML="";

    for (let i = 0; i< books.length; i ++){

        const book = books[i];

        const deleteElement = document.createElement("i");
        deleteElement.setAttribute("style","align-self: flex-end;");
        deleteElement.setAttribute("class", "fa-solid fa-trash");
        deleteElement.setAttribute("onclick",`deleteFromMyList(${JSON.stringify(book.id)})`);

        const bookElement = createElements(book,deleteElement);

        bookList.appendChild(bookElement);
    }
}

function deleteFromMyList(id){
    sessionStorage.removeItem(id);
    displayMyList();
}

displayMyList();
