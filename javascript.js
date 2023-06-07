//Consts definition zone
const formTitle = document.getElementById("form-title");
const hr = document.getElementById("hr");
const myPL = document.getElementById("myPL");

//Get books from API
async function getSearchResult(inputTitle, inputAuthor){

    const keyWordTitle= inputTitle.value;
    const keyWordAuthor= inputAuthor.value;
     
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}`);
    const books = await response.json()
        .then(books => addResultsInHtml(books));
}

//Display the search results
function addResultsInHtml(books){
  
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML= "";
    createSearchResultsSection(searchResults);

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
        
        const bookElement = createBookElements(book,bookMarkElement);

        sectionBook.appendChild(bookElement);
    }
}

//Create the search results section
function createSearchResultsSection(searchResults){

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
}

//Create the books elements
function createBookElements(book, iconElement){

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

//retrieve books from the session storage
function getSessionStorage(){
    
    let books = [];
    for(let i = 0; i< sessionStorage.length;i++){
       const response = sessionStorage.getItem(sessionStorage.key(i));
        books.push(JSON.parse(response));
    }
    return books;
}

//display the PochList
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

        const bookElement = createBookElements(book,deleteElement);

        bookList.appendChild(bookElement);
    }
}

//Delete a book from the PochList
function deleteFromMyList(id){
    sessionStorage.removeItem(id);
    displayMyList();
}

//Display the search form
function displayForm(add){

    const formSection = document.getElementById("formSection")

    add.style.display="none";

    const form = createForm();

    formSection.appendChild(form);

    const inputTitle = document.getElementById("bookTitle");
    const inputAuthor = document.getElementById("author");

    search.addEventListener("click", () => {
        getSearchResult(inputTitle, inputAuthor);
    });    
    cancel.addEventListener("click", () => {
        add.style.display="block";
        document.getElementById("formSection").innerHTML="";
        document.getElementById("searchResults").innerHTML="";
    })
  
}

//Create the html form
 function createForm(){

    const form = document.createElement("form");
    form.setAttribute("action", "javascript:void(0);");
    form.setAttribute("id", "form");
    form.setAttribute("class", "form");

    const fieldTitle = createField("bookTitle","Titre du livre");
    const fieldAuthor = createField("author", "Auteur");
    const searchButton = createButton("submit","Rechercher", "search", "button");
    const cancelButton = createButton("button","Annuler","cancel","button button--cancel");

    form.appendChild(fieldTitle);
    form.appendChild(fieldAuthor);
    form.appendChild(searchButton);
    form.appendChild(cancelButton);

    return form;
 }

 //Create fields for the form
function createField(fieldName,labelName){
    const field = document.createElement("fieldset");
    field.setAttribute("class","form__field");

    const label = document.createElement("label");
    label.setAttribute("for",fieldName);
    label.innerText = labelName;

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", fieldName);
    input.setAttribute("name", fieldName);
    input.setAttribute("required","");

    field.appendChild(label);
    field.appendChild(input);

    return field;
}

//Create buttons for the form
function createButton(type, value, id, className){
    const button = document.createElement("input");
    button.setAttribute("type", type);
    button.setAttribute("value", value);
    button.setAttribute("id", id);
    button.setAttribute("class",className);

    return button;
}

//Display the Page
function displayPage(){
    formTitle.insertAdjacentHTML(
        "afterend",
        "<button type='button' class='button button--new' id='addBook'>Ajouter un Livre</button>");
    
    const add = document.getElementById("addBook");

    add.insertAdjacentHTML(
        "afterend",   
        "<section id='formSection'></section>");
    
    add.addEventListener("click",() => {displayForm(add)});
    hr.insertAdjacentHTML("afterend", "<div class='searchResult' id='searchResults'>");    
    myPL.insertAdjacentHTML("afterend", "<section class='books-Container' id='book-list'></section>");
    displayMyList();
}

displayPage();
