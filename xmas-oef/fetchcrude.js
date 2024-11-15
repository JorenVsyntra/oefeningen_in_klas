const kidsUrl = 'http://localhost:3000/kids';
const giftsUrl = 'http://localhost:3000/gifts';
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
                <span>${post.name}</span>
                <button onclick="removeFromSaved('${post.id}')">Remove</button>
            `;
            savedOutput.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error loading saved posts:', error);
        localStorage.setItem('savedPosts', '[]');
    }
}

//Fetch toy data
function fetchToyData() {
    giftList.innerHTML = '';
    fetch (giftsUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(gift => {
            giftList.innerHTML += `<li>${gift.name}</li>`
        });
    })
    .catch(error => console.error(error));
}

// Fetch kids and their associated gifts
async function fetchdata() {
    output.innerHTML = '';
    try {
        const kidsResponse = await fetch(kidsUrl);
        const kidsData = await kidsResponse.json();

        const giftsResponse = await fetch(giftsUrl);
        const giftsData = await giftsResponse.json();

        if (kidsData.length === 0) {
            const noPostsMessage = document.createElement('div');
            noPostsMessage.className = 'no-posts-message';
            noPostsMessage.textContent = 'No kids available. Add your first kid!';
            output.appendChild(noPostsMessage);
            return;
        }
        
        // Sort kids by timestamp in descending order
        const sortedKids = kidsData.sort((a, b) => b.timestamp - a.timestamp);
        
        sortedKids.forEach(kid => {
            // Filter gifts associated with the current kid by kid's id
            const kidGifts = giftsData.filter(gift => gift.kidId === kid.id);

            // Generate HTML for each kid with their associated gifts
            let giftsHTML = '<ul>';
            kidGifts.forEach(gift => {
                giftsHTML += `<li>${gift.name}</li>`;
            });
            giftsHTML += '</ul>';

            output.innerHTML += `
                <div class="post-item" id="post-${kid.id}">
                    <span class="post-content">${kid.name} - Gifts: ${kid.gifts} </span>
                    ${giftsHTML}
                    <div class="edit-form" style="display: none;">
                        <input type="text" class="edit-kidName" value="${kid.name}">
                        <div class="edit-gifts">
                            <label for="giftsDropdown-${kid.id}">Select Gifts:</label>
                            <select id="giftsDropdown-${kid.id}" multiple>
                                ${giftsData.map(gift => `<option value="${gift.id}">${gift.name}</option>`).join('')}
                            </select>
                        </div>
                        <button class="smallbutton" onclick="saveEdit('${kid.id}')">S</button>
                        <button class="smallbutton" onclick="cancelEdit('${kid.id}')">X</button>
                    </div>
                    <div class="button-group">
                        <button onclick="editPost('${kid.id}')">Edit</button>
                        <button onclick="saveToLocal('${kid.id}', '${kid.name}')">Save</button>
                        <button onclick="deletePost('${kid.id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.error('Error fetching data:', e);
    }
}

// Show the edit form and populate the gifts dropdown for a kid
function editPost(id) {
    const postDiv = document.getElementById(`post-${id}`);
    postDiv.querySelector('.post-content').style.display = 'none';
    postDiv.querySelector('.edit-form').style.display = 'block';
    postDiv.querySelector('.button-group').style.display = 'none';
}

// Cancel editing
function cancelEdit(id) {
    const postDiv = document.getElementById(`post-${id}`);
    postDiv.querySelector('.post-content').style.display = 'block';
    postDiv.querySelector('.edit-form').style.display = 'none';
    postDiv.querySelector('.button-group').style.display = 'block';
}

// Save the updated kid data, including selected gifts
function saveEdit(id) {
    const postDiv = document.getElementById(`post-${id}`);
    const newKidName = postDiv.querySelector('.edit-kidName').value;
    const selectedGiftIds = Array.from(postDiv.querySelector(`#giftsDropdown-${id}`).selectedOptions)
                                  .map(option => option.value);

    // Create updated post object with new name and selected gifts
    const updatedPost = {
        name: newKidName,
        gifts: selectedGiftIds, // Associate selected gift IDs
        timestamp: Date.now() // Update timestamp
    };

    // Send PUT request to update the post
    fetch(`${kidsUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(res => res.json())
    .then(() => {
        fetchdata(); // Refresh the posts display
    })
    .catch(e => console.error('Error updating post:', e));
}

// Initial load
fetchdata();
loadSavedPosts();
fetchToyData();