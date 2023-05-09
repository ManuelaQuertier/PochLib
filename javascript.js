const add = document.getElementById("addBook");
const search= document.getElementById("search");
const cancel= document.getElementById("cancel");

add.addEventListener("click", () => {
    document.getElementById("form").style.display="flex";
});

function noneToFlex(){
    document.getElementById("searchResults").style.display="flex";
}

search.addEventListener("click", noneToFlex, true);
search.addEventListener("click", getSearchResult, true);
//cancel.addEventListener("click", cancelSearch);



const yourAPIKey = config.MY_KEY;

async function getSearchResult(){

    const keyWordTitle= document.getElementById("bookTitle").value;
    const keyWordAuthor= document.getElementById("author").value;
     
const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}&key=${yourAPIKey}`);
 const books = await response.json();

 for (let i = 0; i< books.items.length; i ++){
 const book = books.items[i];

const bookElement = document.createElement("div");
bookElement.classList.add("book");
const titleBook = document.createElement("h2"); 
titleBook.innerText = "Titre: " + book.volumeInfo.title;
const idBook = document.createElement("p");
idBook.innerText = "Id: " + book.id;
const authorBook = document.createElement("p");
authorBook.innerText = "Auteur: " + book.volumeInfo.authors[0];
const descriptionBook = document.createElement("p");
descriptionBook.innerText = "Description: " + book.volumeInfo.description;
const imgBook = document.createElement("img");
imgBook.classList.add("book__img");
imgBook.src = book.volumeInfo.imageLinks.thumbnail;


bookElement.appendChild(titleBook);
bookElement.appendChild(idBook);
bookElement.appendChild(authorBook);
bookElement.appendChild(descriptionBook);
bookElement.appendChild(imgBook);

const sectionBook = document.getElementById("books-result");
sectionBook.appendChild(bookElement);
}

}