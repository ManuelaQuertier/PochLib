const add = document.getElementById("addBook");

add.addEventListener("click", noneToFlex);

function noneToFlex(){
    document.getElementById("form").style.display="flex";
}

const yourAPIKey ="AIzaSyB7zsIsltMlGWit9tqlm--sjmNDB_4OuN0";
const keyWordTitle= "lord of the rings";
const keyWordAuthor= "Tolkien";

fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${keyWordTitle}+inauthor:${keyWordAuthor}&key=${yourAPIKey}`);
