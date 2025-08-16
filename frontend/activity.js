// Activate the current tab
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Function to simulate adding a new activity
function addNewActivity(username, action, detail, time, avatar = 'avatar1.jpg') {
    const feed = document.querySelector('.activity-feed');
    
    const item = document.createElement('div');
    item.classList.add('activity-item');

    item.innerHTML = `
        <img src="${avatar}" alt="Avatar" class="avatar" />
        <div class="message">
            <p><strong class="str">@${username}</strong> ${action}: <span>${detail}</span></p>
            <span class="time">${time}</span>
        </div>
    `;

    // Add the new item at the top
    feed.insertBefore(item, feed.firstChild);
}

// Example: Add a new activity every 10 seconds
setInterval(() => {
    const now = new Date().toLocaleTimeString();
    addNewActivity('NewStreamer', 'started streaming', 'Minecraft Adventure', now);
}, 10000);

// Optional: Add "Mark as Read" button functionality if you include it in the HTML
const markButton = document.querySelector('.mark-read');
if (markButton) {
    markButton.addEventListener('click', () => {
        const messages = document.querySelectorAll('.message p');
        messages.forEach(msg => {
            msg.style.opacity = 0.5;
        });
    });
}
