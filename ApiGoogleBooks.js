

export async function research() {

const yourAPIKey ="AIzaSyB7zsIsltMlGWit9tqlm--sjmNDB_4OuN0";
const keyWordTitle= "lord of the rings";
const keyWordAuthor= "Tolkien";

return await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:"+ keyWordTitle + "+inauthor:" + keyWordAuthor + "&key=" + yourAPIKey);
}