const url = 'http://localhost:3000/posts';
const url_comments = 'http://localhost:3000/comments';
const output = document.getElementById('output');

function showPostForm() {
    document.querySelector('.post-form').classList.remove('hidden');
    document.querySelector('.comment-form').classList.add('hidden');
}

function showCommentForm() {
    document.querySelector('.comment-form').classList.remove('hidden');
    document.querySelector('.post-form').classList.add('hidden');
}

function addPost() {
    const title = document.getElementById('post-title').value.trim();
    if (!title) {
        alert('Please enter a title');
        return;
    }

    const newPost = {
        title: title,
        views: parseInt(document.getElementById('post-views').value) || 0,
        likes: parseInt(document.getElementById('post-likes').value) || 0,
        timestamp: Date.now()
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => {
        if (!response.ok) throw new Error('Add failed');
        // Clear form
        document.getElementById('post-title').value = '';
        document.getElementById('post-views').value = '';
        document.getElementById('post-likes').value = '';
        fetchdata();
    })
    .catch(e => console.error('Error adding post:', e));
}

function addComment() {
    const title = document.getElementById('comment-title').value.trim();
    if (!title) {
        alert('Please enter a comment');
        return;
    }

    const newComment = {
        title: title,
        views: parseInt(document.getElementById('comment-views').value) || 0,
        likes: parseInt(document.getElementById('comment-likes').value) || 0,
        timestamp: Date.now()
    };

    fetch(url_comments, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    .then(response => {
        if (!response.ok) throw new Error('Add failed');
        // Clear form
        document.getElementById('comment-title').value = '';
        document.getElementById('comment-views').value = '';
        document.getElementById('comment-likes').value = '';
        fetchdata();
    })
    .catch(e => console.error('Error adding comment:', e));
}

// Fetch and display posts and comments
function fetchdata() {
    output.innerHTML = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Sort by timestamp in descending order
            data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            
            data.forEach(post => {
                const date = post.timestamp ? new Date(post.timestamp).toLocaleString() : 'No date';
                output.innerHTML += `
                    <div class="post-card">
                        <div class="post-header">
                            <div class="post-content">
                                <h3>${post.title}</h3>
                                <p class="post-date">Created: ${date}</p>
                                <p class="post-stats">
                                    Views: ${post.views} | Likes: ${post.likes}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(e => console.error('Error fetching posts:', e));

    fetch(url_comments)
        .then(res => res.json())
        .then(data => {
            // Sort by timestamp in descending order
            data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            
            data.forEach(comment => {
                const date = comment.timestamp ? new Date(comment.timestamp).toLocaleString() : 'No date';
                output.innerHTML += `
                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-content">
                                <h3>${comment.title}</h3>
                                <p class="comment-date">Created: ${date}</p>
                                <p class="comment-stats">
                                    Views: ${comment.views} | Likes: ${comment.likes}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(e => console.error('Error fetching comments:', e));
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchdata);