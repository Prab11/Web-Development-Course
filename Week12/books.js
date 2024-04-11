
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
    const user = netlifyIdentity.currentUser();
  

    user.jwt().then((token) => {



        fetch('/.netlify/functions/createBook', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, isbn, published_year: publishedYear, genre }),
        })
            .then(response => {
                if (response.ok) {
                    $('#addBookModal').modal('hide');
                    fetchBooks(); 
                }
            })
            .catch(error => console.error('Error:', error));
    });
}

document.addEventListener('DOMContentLoaded', fetchBooks);


function openEditModal(bookId) {
    console.log("Book Id", bookId)

 
    const user = netlifyIdentity.currentUser();

    user.jwt().then((token) => {
     
        fetch(`/.netlify/functions/readBook?id=${bookId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,

            },
        })
            .then(response => response.json())
            .then(book => {
                console.log(book)
                document.getElementById('editBookId').value = book.id;
                document.getElementById('editBookTitle').value = book.title;
                document.getElementById('editBookAuthor').value = book.author;
                document.getElementById('editBookISBN').value = book.isbn;
                document.getElementById('editBookPublishedYear').value = book.published_year;
                document.getElementById('editBookGenre').value = book.genre;

                $('#editBookModal').modal('show');

            })
            .catch(error => console.error('Error fetching book details:', error));
    });
}

function updateBook() {
    const bookData = {
        id: document.getElementById('editBookId').value,
        title: document.getElementById('editBookTitle').value,
        author: document.getElementById('editBookAuthor').value,
        isbn: document.getElementById('editBookISBN').value,
        published_year: document.getElementById('editBookPublishedYear').value,
        genre: document.getElementById('editBookGenre').value,
    };

    const user = netlifyIdentity.currentUser();

  
    user.jwt().then((token) => {
        fetch('/.netlify/functions/updateBook', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Book updated:', data);
                $('#editBookModal').modal('hide');
                fetchBooks(); // Refresh the books list
            })
            .catch(error => console.error('Error updating book:', error));
    });
}




// Function to confirm and delete a book
function confirmDelete(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        const user = netlifyIdentity.currentUser();
        user.jwt().then((token) => {

            fetch(`/.netlify/functions/deleteBook?id=${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.ok) {
                        fetchBooks(); // Update the book list
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }
}
// Run the fetchBooks function on page load
document.addEventListener('DOMContentLoaded', fetchBooks());