let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  if (!title || !author) return alert("Fill all fields");

  books.push({
    id: Date.now(),
    title,
    author,
    issued: false
  });

  saveBooks();
  displayBooks();
}

function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  saveBooks();
  displayBooks();
}

function toggleIssue(id) {
  books = books.map(book =>
    book.id === id ? { ...book, issued: !book.issued } : book
  );
  saveBooks();
  displayBooks();
}

function displayBooks(filtered = books) {
  const list = document.getElementById("book-list");
  list.innerHTML = "";

  filtered.forEach(book => {
    const div = document.createElement("div");
    div.className = "book";

    div.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p class="${book.issued ? 'issued' : ''}">
          ${book.issued ? "Issued" : "Available"}
        </p>
      </div>

      <div>
        <button onclick="toggleIssue(${book.id})">
          ${book.issued ? "Return" : "Issue"}
        </button>
        <button onclick="deleteBook(${book.id})">Delete</button>
      </div>
    `;

    list.appendChild(div);
  });

  updateStats();
}

function searchBook() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  displayBooks(filtered);
}

function updateStats() {
  document.getElementById("total").innerText = books.length;
  document.getElementById("issued").innerText =
    books.filter(b => b.issued).length;
}

// Initial load
displayBooks();
