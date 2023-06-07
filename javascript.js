//Consts definition zone
const formTitle = document.getElementById("form-title");
const hr = document.getElementById("hr");
const myPL = document.getElementById("myPL");
/*
const cancel= document.getElementById("cancel");

cancel.addEventListener("click", ()=>{
    location.reload();
})*/

//functions zone

//Get books from API
async function getSearchResult(inputTitle, inputAuthor){

    const keyWordTitle= inputTitle.value;
    const keyWordAuthor= inputAuthor.value;
     
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}`);
    const books = await response.json()
        .then(books => addResultsInHtml(books));
}

function addResultsInHtml(books){

    hr.insertAdjacentHTML("afterend", "<div class='searchResult' id='searchResults'>");
    const searchResults = document.getElementById("searchResults");

    const searchSectiontitle = document.createElement("h2");
    searchSectiontitle.innerText= "Résultats de recherche";

    const noResultsSection = document.createElement("div");
    noResultsSection.setAttribute("id", "no-results");

    const bookContainer = document.createElement("section");
    bookContainer.setAttribute("class", "books-Container");
    bookContainer.setAttribute("id", "books-result");

    const hrMyPochList = document.createElement("hr");

    searchResults.appendChild(searchSectiontitle);
    searchResults.appendChild(noResultsSection);
    searchResults.appendChild(bookContainer);
    searchResults.appendChild(hrMyPochList);

    if (books.totalItems === 0){
        const noResults = document.getElementById("no-results");
        const message = document.createElement("h3");
        message.innerText = "Aucun livre n'a été trouvé";

        noResults.appendChild(message);
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

    const titleBook = document.createElement("h3"); 
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
function displayPage(){
    formTitle.insertAdjacentHTML(
        "afterend",
        "<button type='button' class='button button--new' id='addBook'>Ajouter un Livre</button>");
        const add = document.getElementById("addBook");
        add.addEventListener("click",() => {displayForm(add)});
    myPL.insertAdjacentHTML("afterend", "<section class='books-Container' id='book-list'></section>");
    displayMyList();
}

function displayForm(add){

    add.insertAdjacentHTML("afterend",
    '<form action="javascript:void(0);" id="form" class="form"></form>');
    add.style.display="none";

    let form = document.getElementById("form");

    const fieldTitle = document.createElement("fieldset");
    fieldTitle.setAttribute("class","form__field");

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for","bookTitle");
    labelTitle.innerText = "Titre du livre";

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "bookTitle");
    inputTitle.setAttribute("name", "bookTitle");
    inputTitle.setAttribute("required","");

    fieldTitle.appendChild(labelTitle);
    fieldTitle.appendChild(inputTitle);


    const fieldAuthor = document.createElement("fieldset");
    fieldAuthor.setAttribute("class","form__field");

    const labelAuthor = document.createElement("label");
    labelAuthor.setAttribute("for","author");
    labelAuthor.innerText = "Auteur";

    const inputAuthor = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "author");
    inputTitle.setAttribute("name", "author");
    inputTitle.setAttribute("required","");

    fieldAuthor.appendChild(labelAuthor);
    fieldAuthor.appendChild(inputAuthor);


    const searchButton = document.createElement("input");
    searchButton.setAttribute("type", "submit");
    searchButton.setAttribute("value", "Rechercher");
    searchButton.setAttribute("id", "search");
    searchButton.setAttribute("class","button");

    const cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("value", "Annuler");
    cancelButton.setAttribute("id", "cancel");
    cancelButton.setAttribute("class","button button--cancel");

    form.appendChild(fieldTitle);
    form.appendChild(fieldAuthor);
    form.appendChild(searchButton);
    form.appendChild(cancelButton);

    search.addEventListener("click", () => {
        getSearchResult(inputTitle, inputAuthor);
    });    

  
}
displayPage();
