let myLibrary = [];

function Book(title, author, pages, read){

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){

    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("read").checked;
    const form = document.getElementById("form");

    addBookToLibrary(title, author, pages, hasRead);
    
    form.reset();
    showBooks();
    form.classList.toggle("hidden");
    
})

function showBooks(){
    const libraryContainer = document.getElementById("library-container");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book)=>{
        let bookCard = document.createElement("div");
        /* bookCard.setAttribute("data-id", book.id); */
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not read"}</p>
            <button onclick="changeStatus('${book.id}')" class="change-status">Finished?</button>
            <button class="delete-button" onclick = "removeBook('${book.id}')">Delete</button>
`;
   libraryContainer.appendChild(bookCard);
})

}

const addBookBtn = document.getElementById("add-book");

addBookBtn.addEventListener("click", ()=>{
    const form = document.getElementById("form");
    form.classList.toggle("hidden");
});

function removeBook(id){
    myLibrary = myLibrary.filter(book => book.id !== id);
    showBooks();
}

function changeStatus(id){
    let book = myLibrary.find(book => book.id === id);
    if(book){
        book.read = !book.read;
        showBooks();
    }
}
