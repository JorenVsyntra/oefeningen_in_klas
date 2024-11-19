const kidsUrl = 'http://localhost:3000/kids';
const giftsUrl = 'http://localhost:3000/gifts';
const output = document.getElementById('output');
const savedOutput = document.getElementById('savedOutput');

function fetchKidsData() {
    output.innerHTML = '';
    fetch(kidsUrl)
        .then(res => res.json())
        .then(kidsData => {
            if (kidsData.length === 0) {
                const noPostsMessage = document.createElement('div');
                noPostsMessage.className = 'no-posts-message';
                noPostsMessage.textContent = 'There are no good kids. Add a good kid!';
                output.appendChild(noPostsMessage);
                return;
            }
        
        // Sort kids by timestamp in descending order
        const sortedKids = kidsData.sort((a, b) => b.timestamp - a.timestamp);
        sortedKids.forEach(kid => {
            output.innerHTML += `
                <div class="post-item" id="post-${kid.id}">
                    <span class="post-content">${kid.name} - Gifts: ${kid.gifts} </span>
                    <div class="edit-form" style="display: none;">
                        <span>${kid.name}</span>
                        <input type="checkbox" class="bookCheck" style="margin-left: 10px;"> Book
                        <input type="checkbox" class="dollCheck" style="margin-left: 10px;"> Doll
                        <input type="checkbox" class="carCheck" style="margin-left: 10px;"> Car
                        <input type="checkbox" class="legoCheck" style="margin-left: 10px;"> Lego
                        <input type="checkbox" class="psCheck" style="margin-left: 10px;"> Playstation
                        <button class="smallbutton" onclick="saveEdit('${kid.id}')" style="margin-left: 20px;">Save</button>
                        <button class="smallbutton" onclick="cancelEdit('${kid.id}')">Cancel</button>
                    </div>
                    <div class="button-group">
                        <button onclick="editPost('${kid.id}')">Edit</button>
                        <button onclick="saveToLocal('${kid.id}', '${kid.name}', '${kid.gifts}')">Save</button>
                        <button onclick="deletePost('${kid.id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    }) 
    .catch(e => console.error('Error fetching posts:', e));
}

// Add a child name to the list
document.getElementById('addPostButton').addEventListener('click', () => {
    const newPost = {
        name: document.getElementById('kidName').value,
        gifts: [],
        timestamp: Date.now()
    }
    fetch(kidsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(() => {
        fetchKidsData();
        document.getElementById('kidName').value = '';
    })
    .catch(e => console.error('Error adding post:', e))
});

// Refresh button
document.getElementById('clear').addEventListener('click', fetchKidsData);

// Clear localStorage
document.getElementById('clearStorage').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the magic sleighbag?')) {
        localStorage.removeItem('savedPosts');
        loadSavedPosts();
    }
});

// Edit a post
function editPost(id) {
    // Show edit form and hide content for the selected post
    const postDiv = document.getElementById(`post-${id}`);
    postDiv.querySelector('.post-content').style.display = 'none';
    postDiv.querySelector('.edit-form').style.display = 'block';
    postDiv.querySelector('.button-group').style.display = 'none';
}

        // Cancel edit after opening edit post function
        function saveEdit(id) {
            // Get the edited values
            const postDiv = document.getElementById(`post-${id}`);
            let giftsArray = [];
            let addBook = postDiv.querySelector('.bookCheck').checked ? giftsArray.push('Book') : null;
            let addDoll = postDiv.querySelector('.dollCheck').checked ? giftsArray.push('Doll') : null;
            let addCar = postDiv.querySelector('.carCheck').checked ? giftsArray.push('Toycar') : null;
            let addLego = postDiv.querySelector('.legoCheck').checked ? giftsArray.push('Lego') : null;
            let addPS = postDiv.querySelector('.psCheck').checked ? giftsArray.push('Playstation') : null;

            // Create updated post object
            const updatedPost = {
                gifts: giftsArray
            };

            // Send PUT request to update the post
            fetch(`${kidsUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            })
            .then(res => res.json())
            .then(() => {
                // Refresh the posts display
                fetchKidsData();
            })
            .catch(e => console.error('Error updating post:', e));
        }

        // Cancel edit after opening edit post function
        function cancelEdit(id) {
            // Hide edit form and show content
            const postDiv = document.getElementById(`post-${id}`);
            postDiv.querySelector('.post-content').style.display = 'block';
            postDiv.querySelector('.edit-form').style.display = 'none';
            postDiv.querySelector('.button-group').style.display = 'block';
        }

// Save post to localStorage
function saveToLocal(postId, postName, postGifts, timestamp) {
    try {
        const post = {
            id: postId,  // postId is received as a string
            name: postName,
            gifts: postGifts,
            timestamp: timestamp
        };
        
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        
        if (!savedPosts.some(p => p.id === post.id)) {  // Comparing strings with strings
            savedPosts.push(post);
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
            loadSavedPosts();
            deletePost(post.id);
            fetchKidsData();
        } else {
            alert("This child's gifts are already saved!");
        }
    } catch (error) {
        console.error('Error saving post:', error);
    }
}

// Delete post
function deletePost(id) {
    fetch(`${kidsUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchKidsData())
    .catch(e => console.error('Error deleting post:', e));
}

// Load saved posts from localStorage
function loadSavedPosts() {
    try {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        savedOutput.innerHTML = '';
        
        if (savedPosts.length === 0) {
            const noPostsMessage = document.createElement('div');
            noPostsMessage.className = 'no-posts-message';
            noPostsMessage.textContent = 'No saved gifts yet!';
            savedOutput.appendChild(noPostsMessage);
            return;
        }

        // Sort saved posts by timestamp in descending order
        savedPosts.sort((a, b) => b.timestamp - a.timestamp);
        savedPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post-item';
            postDiv.innerHTML = `
                <span>${post.name} - Gifts: ${post.gifts}</span>
                <div class="button-group">
                    <button onclick="removeFromSaved('${post.id}')">Remove</button>
                </div>
            `;
            savedOutput.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error loading saved posts:', error);
        localStorage.setItem('savedPosts', '[]');
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

function fetchGiftsData() {
    giftOutput.innerHTML = '';
    fetch(giftsUrl)
        .then(res => res.json())
        .then(giftsData => {
            if (giftsData.length === 0) {
                const noPostsMessage = document.createElement('div');
                noPostsMessage.className = 'no-posts-message';
                noPostsMessage.textContent = 'No gifts available. Add your first post!';
                output.appendChild(noPostsMessage);
                return;
            }
        
        // Sort kids by timestamp in descending order
        const sortedKids = giftsData.sort((a, b) => b.timestamp - a.timestamp);
        sortedKids.forEach(gifts => {
            giftOutput.innerHTML += `
                <div class="post-item" id="post-${gifts.id}">
                    <span class="post-content">${gifts.name} </span>
                    <div class="button-group">
                        <button class="xsmallbutton" onclick="deleteGift('${gifts.id}')">X</button>
                    </div>
                </div>
            `;
        });
    }) 
    .catch(e => console.error('Error fetching posts:', e));
}

// Add a toy name to the list
document.getElementById('addGiftButton').addEventListener('click', () => {
    const newGift = {
        name: document.getElementById('giftName').value,
    }
    fetch(giftsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGift)
    })
    .then(() => {
        fetchGiftsData();
        document.getElementById('giftName').value = '';
    })
    .catch(e => console.error('Error adding post:', e))
});

function deleteGift(id) {
    fetch(`${giftsUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchGiftsData())
    .catch(e => console.error('Error deleting post:', e));
}

// Initial load
fetchKidsData();
loadSavedPosts();
fetchGiftsData();