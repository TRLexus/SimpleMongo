document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
});

function loadBooks() {
    fetch("/api/books")
        .then(response => response.json())
        .then(data => {
            displayBooks(data);
        })
        .catch(error => console.error("Error fetching books:", error));
}

function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach(book => {
        const listItem = document.createElement("li");
        listItem.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(listItem);
    });
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    fetch("/api/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Book added:", data);
            loadBooks(); // Refresh the book list after adding a book
        })
        .catch(error => console.error("Error adding book:", error));
}
