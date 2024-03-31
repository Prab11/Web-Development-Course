// function showBooks() {
//     fetch('/.netlify/functions/allBooks')
//       .then(response => response.json())
//       .then(books => {
//         const booksContainer = document.getElementById('books-list');
//         booksContainer.innerHTML = ''; // Clear previous data
  
//         books.forEach(book => {
//           const { id, title, author, isbn, published_year, genre } = book;
//           const row = `
//             <tr>
//               <td>${id}</td>
//               <td>${title}</td>
//               <td>${author}</td>
//               <td>${isbn}</td>
//               <td>${published_year}</td>
//               <td>${genre}</td>
//               <td>
//                 <button class="btn btn-primary" onclick="openEditModal(${id})">Edit</button>
//                 <button class="btn btn-danger" onclick="confirmDelete(${id})">Delete</button>
//               </td>
//             </tr>
//           `;
//           booksContainer.innerHTML += row;
//         });
//       })
//       .catch(error => console.error('Error fetching books:', error));
//   }
  
//   // Call showBooks() on page load
//   document.addEventListener('DOMContentLoaded', showBooks);

  
// //   function addBook() {
// //     const title = document.getElementById('title').value;
// //     const author = document.getElementById('author').value;
// //     // Fetch and prepare data for ISBN, published year, and genre
// //     fetch('/.netlify/functions/createBook', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ title, author /* Include other fields here */ }),
// //     })
// //     .then(response => {
// //       if (response.ok) {
// //         $('#addBookModal').modal('hide');
// //         showBooks(); // Reload book list
// //       }
// //     })
// //     .catch(error => console.error('Error adding book:', error));
// //   }

// function addBook() {
//     const title = document.getElementById('title').value;
//     const author = document.getElementById('author').value;
//     const isbn = document.getElementById('isbn').value;
//     const publishedYear = document.getElementById('publishedYear').value;
//     const genre = document.getElementById('genre').value;
  
//     fetch('/.netlify/functions/createBook', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title, author, isbn, published_year: publishedYear, genre }),
//     })
//     .then(response => {
//       if (response.ok) {
//         $('#addBookModal').modal('hide');
//         showBooks(); // Update the book list
//       }
//     })
//     .catch(error => console.error('Error:', error));
//   }


//   function openEditModal(id) {
//     fetch(`/.netlify/functions/readBook?id=${id}`)
//       .then(response => response.json())
//       .then(book => {
//         document.getElementById('editBookId').value = book.id;
//         document.getElementById('editTitle').value = book.title;
//         document.getElementById('editAuthor').value = book.author;
//         // Populate other fields like ISBN, published year, genre
//         $('#editBookModal').modal('show');
//       })
//       .catch(error => console.error('Error fetching book details:', error));
//   }

//   function updateBook() {
//     const id = document.getElementById('editBookId').value;
//     const title = document.getElementById('editTitle').value;
//     const author = document.getElementById('editAuthor').value;
//     // Fetch other fields like ISBN, published year, and genre
//     fetch('/.netlify/functions/updateBook', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id, title, author /* Include other fields here */ }),
//     })
//     .then(response => {
//       if (response.ok) {
//         $('#editBookModal').modal('hide');
//         showBooks(); // Reload book list
//       }
//     })
//     .catch(error => console.error('Error updating book:', error));
//   }


//   function confirmDelete(id) {
//     if (confirm('Are you sure you want to delete this book?')) {
//       fetch(`/.netlify/functions/deleteBook?id=${id}`, {
//         method: 'DELETE',
//       })
//       .then(response => {
//         if (response.ok) {
//           showBooks(); // Reload book list
//         }
//       })
//       .catch(error => console.error('Error deleting book:', error));
//     }
//   }
  



  function showBooks() {
    fetch('/.netlify/functions/allBooks')
      .then(response => response.json())
      .then(books => {
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';
        books.forEach(book => {
          const row = `
            <tr>
              <td>${book.id}</td>
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
        `;
        booksList.innerHTML += row;
      });
    })
    .catch(error => console.error('Error:', error));
  }
  
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
        showBooks(); // Update the book list
      }
    })
    .catch(error => console.error('Error:', error));
  }
  
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
        showBooks(); // Update the book list
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
          showBooks(); // Update the book list
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }
  
  // Run the showBooks function on page load
  document.addEventListener('DOMContentLoaded', showBooks());