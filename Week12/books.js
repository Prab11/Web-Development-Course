
function fetchBooks() {

    const user = netlifyIdentity.currentUser();
    // if (!user) {
       
    //     console.log('User not logged in');
    //     return;
    // }
    
    user.jwt().then((token) => {
       
        fetch('/.netlify/functions/allBooks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            // fetch('/.netlify/functions/allBooks')
            .then(response => response.json())
            .then(books => {
                const booksContainer = document.getElementById('books-container');
                const bookList = books.map(book => `
         
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.published_year}</td>
            <td>${book.genre}</td>
            <td>
           
              <button class="btn btn-sm btn-info" onclick="openEditModal(${book.id})">Edit</button>
                   <button class="btn btn-sm btn-danger" onclick="confirmDelete(${book.id})">Delete</button>
            </td>
          </tr>
        `).join('');
                booksContainer.innerHTML = `<table>${bookList}</table>`;
            })
            .catch(error => console.error('Error fetching books:', error));
    });
}


document.addEventListener('DOMContentLoaded', fetchBooks);

// Function to add a new book
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const publishedYear = document.getElementById('publishedYear').value;
    const genre = document.getElementById('genre').value;

    fetch('/.netlify/functions/createBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, isbn, published_year: publishedYear, genre }),
    })
        .then(response => {
            if (response.ok) {
                $('#addBookModal').modal('hide');
                fetchBooks(); // Update the book list
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', fetchBooks);
// Function to open the edit modal with book details
async function openEditModal(bookId) {
    try {
        const response = await fetch(`/.netlify/functions/readBook?id=${bookId}`);
        const book = await response.json();

        document.getElementById('editBookId').value = book.id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editISBN').value = book.isbn || '';
        document.getElementById('editPublishedYear').value = book.published_year;
        document.getElementById('editGenre').value = book.genre || '';

        $('#editBookModal').modal('show');
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

// Function to update an existing book
function updateBook() {
    const id = document.getElementById('editBookId').value;
    const title = document.getElementById('editTitle').value;
    const author = document.getElementById('editAuthor').value;
    const isbn = document.getElementById('editISBN').value;
    const publishedYear = document.getElementById('editPublishedYear').value;
    const genre = document.getElementById('editGenre').value;

    fetch('/.netlify/functions/updateBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, author, isbn, published_year: publishedYear, genre }),
    })
        .then(response => {
            if (response.ok) {
                $('#editBookModal').modal('hide');
                fetchBooks(); // Update the book list
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to confirm and delete a book
function confirmDelete(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        fetch(`/.netlify/functions/deleteBook?id=${bookId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetchBooks(); // Update the book list
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

// Run the fetchBooks function on page load
document.addEventListener('DOMContentLoaded', fetchBooks());