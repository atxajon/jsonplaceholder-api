document.addEventListener('DOMContentLoaded', function(event) {
  // Load blog posts.
  viewBlogPosts();

  let form = document.querySelector('#add-a-post');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.querySelector('#title');
    const body = document.querySelector('#post-body');
    const blogPost = {};
    blogPost.title = title.value;
    blogPost.body = body.value;
    blogPost.userId = 1;
    createNewBlogPost(blogPost).then(displayMessage);
  });
});

const createNewBlogPost = async (newPost) => {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', { 
    method: 'POST', 
    body: JSON.stringify(newPost), 
    dataType: 'json',
    headers: {
      "Content-Type": "application/json"
    }
  });
  let jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse;
  } catch (error) {
    console.log(error);
  }
}

const displayMessage = () => alert('New blog post added');


// @todo: refactor into Class BlogConnector, with methods.

const viewBlogPosts = async () => {
  const urlToFetch = 'https://jsonplaceholder.typicode.com/posts/';
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const blogViewRegion = document.getElementById('blog-posts');
      const jsonResponse = await response.json();
      for (blogPost in jsonResponse) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.textContent = jsonResponse[blogPost].title;
        blogViewRegion.appendChild(card);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

