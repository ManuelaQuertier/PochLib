const add = document.getElementById("addBook");

add.addEventListener("click", noneToFlex);

function noneToFlex(){
    document.getElementById("form").style.display="flex";
}


const yourAPIKey ="AIzaSyB7zsIsltMlGWit9tqlm--sjmNDB_4OuN0";
const keyWordTitle= "lord of the rings";
const keyWordAuthor= "Tolkien";

async function getSearchResult(){
const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}&key=${yourAPIKey}`);
 const books = await response.json();
 const book = books.items[0];

const titleBook = document.createElement("h2"); 
titleBook.innerText = book.volumeInfo.title;
const idBook = document.createElement("p");
idBook.innerText = book.id;
const authorBook = document.createElement("p");
authorBook.innerText = book.volumeInfo.authors[0];
const descriptionBook = document.createElement("p");
descriptionBook.innerText = book.volumeInfo.description;
const imgBook = document.createElement("img");
imgBook.src = book.volumeInfo.imageLinks.thumbnail;

const sectionBook = document.getElementById("book-result");
sectionBook.appendChild(titleBook);
sectionBook.appendChild(idBook);
sectionBook.appendChild(authorBook);
sectionBook.appendChild(descriptionBook);
sectionBook.appendChild(imgBook);
 
}
getSearchResult();



/*


*/