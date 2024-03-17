exports.handler = async function(event, context) {
    try {
      const response = await fetch('https://dummyjson.com/posts/');
      const data = await response.json();
  
      const filteredPosts = data.posts.filter(post => post.reactions > 5);
  
      return {
        statusCode: 200,
        body: JSON.stringify(filteredPosts)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch posts' })
      };
    }
  };
  