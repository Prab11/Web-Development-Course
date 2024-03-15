
display_Books();

joke_display();
fetchNetlifyFunction();

document.getElementById('showQuoteBtn').addEventListener('click', quote_disolay);

function joke_display() {
    fetch('https://n53y4kdb3nbhxuz7uovq5jj7li0uqgsf.lambda-url.us-east-1.on.aws/?api=joke')
        .then(response => response.json())
        .then(data => {
            const jokeContainer = document.getElementById('jokeContainer');
            jokeContainer.innerHTML = `
                    <div class="quote-card">
                    <h2 >joke</h2>
                    <p>${data.joke}</p>
                    </div>`;
        });
}


function quote_disolay() {
    fetch('https://n53y4kdb3nbhxuz7uovq5jj7li0uqgsf.lambda-url.us-east-1.on.aws/?api=qotd')
        .then(response => response.json())
        .then(data => {
            const quoteContainer = document.getElementById('quoteContainer');
            quoteContainer.innerHTML = `
            <div class="quote-card">
            <p>${data.quote.body}</p>
            <p class="author">- ${data.quote.author}</p>
            </div`;
         
        });
}

function display_Books() {
    fetch('https://n53y4kdb3nbhxuz7uovq5jj7li0uqgsf.lambda-url.us-east-1.on.aws/?api=lotr')
        .then(response => response.json())
        .then(data => {
            const books = data.docs;
            const booksList = document.getElementById('BooksList');
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = book.name;
                booksList.appendChild(li);
            });
        });
}
function fetchNetlifyFunction() {
    fetch("/.netlify/functions/hello")
      .then(response => response.json())
      .then(data => {
        const outputDiv = document.getElementById("hello-output");
        outputDiv.textContent = data.message;
      })
      .catch(error => console.error("Error fetching Netlify Function output:", error));
  }

