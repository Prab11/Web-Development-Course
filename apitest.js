
display_Books();

joke_display();

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





document.addEventListener("DOMContentLoaded", function () {
    const postsDiv = document.getElementById("posts");
  
   
    fetch("/.netlify/functions/fetchPosts")
      .then((response) => response.json())
      .then((data) => {
      
        if (Array.isArray(data)) {
          data.forEach((post) => {
            const postElement = createPostElement(post);
            postsDiv.appendChild(postElement);
          });
        } else {
          postsDiv.innerHTML = "<p>No posts found</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        postsDiv.innerHTML = "<p>Error fetching posts</p>";
      });

    function createPostElement(post) {
      const postContainer = document.createElement("div");
      postContainer.classList.add("post");
  
      const titleElement = document.createElement("h2");
      titleElement.classList.add("post-title");
      titleElement.textContent = post.title;
  
      const bodyElement = document.createElement("p");
      bodyElement.classList.add("post-body");
      bodyElement.textContent = post.body;
  
      const footerElement = document.createElement("div");
      footerElement.classList.add("post-footer");
  
      const dateElement = document.createElement("span");
      dateElement.classList.add("post-date");
      dateElement.textContent = "Posted on: " + post.date;
  
      const reactionsElement = document.createElement("span");
      reactionsElement.classList.add("post-reactions");
      reactionsElement.textContent = "Reactions: " + post.reactions;
  
      footerElement.appendChild(dateElement);
      footerElement.appendChild(reactionsElement);
  
      postContainer.appendChild(titleElement);
      postContainer.appendChild(bodyElement);
      postContainer.appendChild(footerElement);
  
      return postContainer;
    }
  });
  