//Consts definition zone
const add = document.getElementById("addBook");
const form = document.getElementById("form");
const search= document.getElementById("search");
const searchResults = document.getElementById("searchResults");
const cancel= document.getElementById("cancel");
const yourAPIKey = config.MY_KEY;


// Events zone
add.addEventListener("click",() => {noneToFlex(form)});
search.addEventListener("click", () => {
    noneToFlex(searchResults);
    getSearchResult();
});


//functions zone
function noneToFlex(elementToFlex){
    elementToFlex.style.display="flex";
}

async function getSearchResult(){

    const keyWordTitle= document.getElementById("bookTitle").value;
    const keyWordAuthor= document.getElementById("author").value;
     
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}&key=${yourAPIKey}`);
    const books = await response.json()
        .then(books => addResultsInHtml(books));
}

function addResultsInHtml(books){
    for (let i = 0; i< books.items.length; i ++){

        const book = books.items[i];
   
        const bookMarkElement = document.createElement("i");
        if(sessionStorage.getItem(book.id)){
            bookMarkElement.setAttribute("class","fa-solid fa-bookmark");
        }else{
        bookMarkElement.setAttribute("class","fa-regular fa-bookmark");
        bookMarkElement.setAttribute("onclick",`addToMyList(${JSON.stringify(book)})`);
        }

        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        
        const titleBook = document.createElement("h2"); 
        titleBook.innerText = "Titre: " + book.volumeInfo.title;

        const idBook = document.createElement("p");
        idBook.innerText = "Id: " + book.id;

        const authorBook = document.createElement("p");
        authorBook.innerText = "Auteur: " + book.volumeInfo.authors[0];

        const descriptionBook = document.createElement("p");
        descriptionBook.innerText = ("Description: " + book.volumeInfo.description).substring(0,200);

        const imgBook = document.createElement("img");
        imgBook.classList.add("book__img");
        imgBook.src = book.volumeInfo.imageLinks == undefined ? "assets/unavailable.png" : book.volumeInfo.imageLinks.thumbnail;
   
        bookElement.appendChild(bookMarkElement);
        bookElement.appendChild(titleBook);
        bookElement.appendChild(idBook);
        bookElement.appendChild(authorBook);
        bookElement.appendChild(descriptionBook);
        bookElement.appendChild(imgBook);
   
        const sectionBook = document.getElementById("books-result");
        sectionBook.appendChild(bookElement);
    }
}

function addToMyList(book){
    sessionStorage.setItem(`${book.id}`,JSON.stringify(book));
    displayMyList();
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

        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const deleteElement = document.createElement("i");
        deleteElement.setAttribute("class", "fa-solid fa-trash");
        deleteElement.setAttribute("onclick",`deleteFromMyList(${JSON.stringify(book.id)})`);

        const titleBook = document.createElement("h2"); 
        titleBook.innerText = "Titre: " + book.volumeInfo.title;

        const idBook = document.createElement("p");
        idBook.innerText = "Id: " + book.id;

        const authorBook = document.createElement("p");
        authorBook.innerText = "Auteur: " + book.volumeInfo.authors[0];

        const descriptionBook = document.createElement("p");
        descriptionBook.innerText = ("Description: " + book.volumeInfo.description).substring(0,200);

        const imgBook = document.createElement("img");
        imgBook.classList.add("book__img");
        imgBook.src = book.volumeInfo.imageLinks == undefined ? "assets/unavailable.png" : book.volumeInfo.imageLinks.thumbnail;

        bookElement.appendChild(deleteElement);
        bookElement.appendChild(titleBook);
        bookElement.appendChild(idBook);
        bookElement.appendChild(authorBook);
        bookElement.appendChild(descriptionBook);
        bookElement.appendChild(imgBook);

        bookList.appendChild(bookElement);

    }

}

function deleteFromMyList(id){
    sessionStorage.removeItem(id);
    location.reload();
}

displayMyList();
