const url = 'http://localhost:3000/posts';
const output = document.getElementById('output');
const savedOutput = document.getElementById('savedOutput');

// Load saved posts from localStorage
function loadSavedPosts() {
    try {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        savedOutput.innerHTML = '';
        
        if (savedPosts.length === 0) {
            const noPostsMessage = document.createElement('div');
            noPostsMessage.className = 'no-posts-message';
            noPostsMessage.textContent = 'No saved posts yet!';
            savedOutput.appendChild(noPostsMessage);
            return;
        }

        // Sort saved posts by timestamp in descending order
        savedPosts.sort((a, b) => b.timestamp - a.timestamp);
        savedPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post-item';
            postDiv.innerHTML = `
                <span>${post.title} (${post.views}) (${post.likes || 0})</span>
                <button onclick="removeFromSaved('${post.id}')">Remove</button>
            `;
            savedOutput.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error loading saved posts:', error);
        localStorage.setItem('savedPosts', '[]');
    }
}

// Save post to localStorage
function saveToLocal(postId, postTitle, postViews, postLikes, timestamp) {
    try {
        const post = {
            id: postId,  // postId is received as a string
            title: postTitle,
            views: postViews,
            likes: postLikes || 0,
            timestamp: timestamp
        };
        
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        
        if (!savedPosts.some(p => p.id === post.id)) {  // Comparing strings with strings
            savedPosts.push(post);
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
            loadSavedPosts();
        } else {
            alert('This post is already saved!');
        }
    } catch (error) {
        console.error('Error saving post:', error);
    }
}

// Remove post from saved posts
function removeFromSaved(postId) {
    try {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        // Convert postId to string for consistent comparison
        const postIdString = String(postId);
        const updatedPosts = savedPosts.filter(post => post.id !== postIdString);
        localStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
        loadSavedPosts();
    } catch (error) {
        console.error('Error removing saved post:', error);
    }
}

function fetchdata() {
    output.innerHTML = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                const noPostsMessage = document.createElement('div');
                noPostsMessage.className = 'no-posts-message';
                noPostsMessage.textContent = 'No posts available. Add your first post!';
                output.appendChild(noPostsMessage);
                return;
            }
            
            // Sort posts by timestamp in descending order
            const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);
            sortedData.forEach(post => {
                output.innerHTML += `
                    <div class="post-item" id="post-${post.id}">
                        <span class="post-content">${post.title} (${post.views}) (${post.likes || 0})</span>
                        <div class="edit-form" style="display: none;">
                            <input type="text" class="edit-title" value="${post.title}">
                            <input type="number" class="edit-views" value="${post.views}">
                            <input type="number" class="edit-likes" value="${post.likes || 0}">
                            <button class="smallbutton" onclick="saveEdit('${post.id}')">S</button>
                            <button class="smallbutton" onclick="cancelEdit('${post.id}')">X</button>
                        </div>
                        <div class="button-group">
                            <button onclick="editPost('${post.id}')">Edit</button>
                            <button onclick="saveToLocal('${post.id}', '${post.title}', ${post.views}, ${post.likes || 0}, ${post.timestamp})">Save</button>
                            <button onclick="deletePost('${post.id}')">Delete</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(e => console.error('Error fetching posts:', e));
}

// Add new post
document.getElementById('addPostButton').addEventListener('click', () => {
    const newPost = {
        title: document.getElementById('title').value,
        views: parseInt(document.getElementById('views').value),
        likes: parseInt(document.getElementById('likes').value) || 0,
        timestamp: Date.now() // Add timestamp when creating new post
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(() => {
        fetchdata();
        document.getElementById('title').value = '';
        document.getElementById('views').value = '';
        document.getElementById('likes').value = '';
    })
    .catch(e => console.error('Error adding post:', e));
});

// Delete post
function deletePost(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchdata())
    .catch(e => console.error('Error deleting post:', e));
}

// Clear localStorage
document.getElementById('clearStorage').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all saved posts?')) {
        localStorage.removeItem('savedPosts');
        loadSavedPosts();
    }
});

// Refresh button - anyways; absolute refresh bruh ;)
document.getElementById('clear').addEventListener('click', fetchdata);

function editPost(id) {
    // Show edit form and hide content for the selected post
    const postDiv = document.getElementById(`post-${id}`);
    postDiv.querySelector('.post-content').style.display = 'none';
    postDiv.querySelector('.edit-form').style.display = 'block';
    postDiv.querySelector('.button-group').style.display = 'none';
}

function cancelEdit(id) {
    // Hide edit form and show content
    const postDiv = document.getElementById(`post-${id}`);
    postDiv.querySelector('.post-content').style.display = 'block';
    postDiv.querySelector('.edit-form').style.display = 'none';
    postDiv.querySelector('.button-group').style.display = 'block';
}

function saveEdit(id) {
    // Get the edited values
    const postDiv = document.getElementById(`post-${id}`);
    const newTitle = postDiv.querySelector('.edit-title').value;
    const newViews = parseInt(postDiv.querySelector('.edit-views').value);
    const newLikes = parseInt(postDiv.querySelector('.edit-likes').value);

    // Create updated post object
    const updatedPost = {
        title: newTitle,
        views: newViews,
        likes: newLikes,
        timestamp: Date.now() // Update timestamp
    };

    // Send PUT request to update the post
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(res => res.json())
    .then(() => {
        // Refresh the posts display
        fetchdata();
    })
    .catch(e => console.error('Error updating post:', e));
}

// Initial load
fetchdata();
loadSavedPosts();