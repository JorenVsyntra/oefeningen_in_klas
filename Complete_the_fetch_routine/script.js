const url = 'http://localhost:3000/posts';
const url_comments = 'http://localhost:3000/comments';
const postsOutput = document.getElementById('posts-output');
const commentsOutput = document.getElementById('comments-output');
const addPostButton = document.getElementById('add-post');
const addCommentButton = document.getElementById('add-comment');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalForm = document.getElementById('modal-form');
const modalCloseButton = document.getElementById('modal-close');

let currentlyEditing = null;

function fetchPosts() {
  postsOutput.innerHTML = '';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).forEach(post => {
        const date = post.timestamp ? new Date(post.timestamp).toLocaleString() : 'No date';
        postsOutput.innerHTML += `
          <div class="post-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="post-header bg-gray-100 px-4 py-3 border-b">
              <h3 class="text-lg font-bold">${post.title}</h3>
            </div>
            <div class="post-content px-4 py-3">
              <p class="text-gray-600 text-sm mb-2">Created: ${date}</p>
              <p class="text-gray-500 text-sm">
                Views: ${post.views} | Likes: ${post.likes}
              </p>
              <div class="flex justify-end mt-3">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 edit-post" data-id="${post.id}">
                  Edit
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded delete-post" data-id="${post.id}">
                  Delete
                </button>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(e => console.error('Error fetching posts:', e));
}

function fetchComments() {
  commentsOutput.innerHTML = '';

  fetch(url_comments)
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).forEach(comment => {
        const date = comment.timestamp ? new Date(comment.timestamp).toLocaleString() : 'No date';
        commentsOutput.innerHTML += `
          <div class="comment-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="comment-header bg-gray-100 px-4 py-3 border-b">
              <h3 class="text-lg font-bold">${comment.title}</h3>
            </div>
            <div class="comment-content px-4 py-3">
              <p class="text-gray-600 text-sm mb-2">Created: ${date}</p>
              <p class="text-gray-500 text-sm">
                Views: ${comment.views} | Likes: ${comment.likes}
              </p>
              <div class="flex justify-end mt-3">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 edit-comment" data-id="${comment.id}">
                  Edit
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded delete-comment" data-id="${comment.id}">
                  Delete
                </button>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(e => console.error('Error fetching comments:', e));
}

function showModal(title, id = null) {
  modalTitle.textContent = title;
  modal.classList.remove('hidden');
  currentlyEditing = id;
}

function hideModal() {
  modal.classList.add('hidden');
  currentlyEditing = null;
  modalForm.reset();
}

function addOrUpdatePost() {
  const titleInput = document.getElementById('title');
  const viewsInput = document.getElementById('views');
  const likesInput = document.getElementById('likes');

  const newPost = {
    title: titleInput.value.trim(),
    views: parseInt(viewsInput.value) || 0,
    likes: parseInt(likesInput.value) || 0,
    timestamp: Date.now()
  };

  if (currentlyEditing) {
    // Update existing post
    fetch(`${url}/${currentlyEditing}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => {
      if (!response.ok) throw new Error('Update failed');
      hideModal();
      fetchPosts();
    })
    .catch(e => console.error('Error updating post:', e));
  } else {
    // Create new post
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => {
      if (!response.ok) throw new Error('Add failed');
      hideModal();
      fetchPosts();
    })
    .catch(e => console.error('Error adding post:', e));
  }
}

function deletePost(id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error('Delete failed');
    fetchPosts();
  })
  .catch(e => console.error('Error deleting post:', e));
}

function addOrUpdateComment() {
  const titleInput = document.getElementById('title');
  const viewsInput = document.getElementById('views');
  const likesInput = document.getElementById('likes');

  const newComment = {
    title: titleInput.value.trim(),
    views: parseInt(viewsInput.value) || 0,
    likes: parseInt(likesInput.value) || 0,
    timestamp: Date.now()
  };

  if (currentlyEditing) {
    // Update existing comment
    fetch(`${url_comments}/${currentlyEditing}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
    .then(response => {
      if (!response.ok) throw new Error('Update failed');
      hideModal();
      fetchComments();
    })
    .catch(e => console.error('Error updating comment:', e));
  } else {
    // Create new comment
    fetch(url_comments, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
    .then(response => {
      if (!response.ok) throw new Error('Add failed');
      hideModal();
      fetchComments();
    })
    .catch(e => console.error('Error adding comment:', e));
  }
}

function deleteComment(id) {
  fetch(`${url_comments}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error('Delete failed');
    fetchComments();
  })
  .catch(e => console.error('Error deleting comment:', e));
}

addPostButton.addEventListener('click', () => showModal('Add Post'));
addCommentButton.addEventListener('click', () => showModal('Add Comment'));
modalCloseButton.addEventListener('click', hideModal);

modalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (currentlyEditing) {
    addOrUpdateComment();
  } else {
    addOrUpdatePost();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-post')) {
    const postId = event.target.dataset.id;
    fetch(`${url}/${postId}`)
      .then(res => res.json())
      .then(post => {
        document.getElementById('title').value = post.title;
        document.getElementById('views').value = post.views;
        document.getElementById('likes').value = post.likes;
        showModal('Edit Post', post.id);
      })
      .catch(e => console.error('Error fetching post:', e));
  } else if (event.target.classList.contains('delete-post')) {
    const postId = event.target.dataset.id;
    deletePost(postId);
  } else if (event.target.classList.contains('edit-comment')) {
    const commentId = event.target.dataset.id;
    fetch(`${url_comments}/${commentId}`)
      .then(res => res.json())
      .then(comment => {
        document.getElementById('title').value = comment.title;
        document.getElementById('views').value = comment.views;
        document.getElementById('likes').value = comment.likes;
        showModal('Edit Comment', comment.id);
      })
      .catch(e => console.error('Error fetching comment:', e));
  } else if (event.target.classList.contains('delete-comment')) {
    const commentId = event.target.dataset.id;
    deleteComment(commentId);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
  fetchComments();
});