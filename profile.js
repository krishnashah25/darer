// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Edit profile button
    const editBtn = document.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        alert('Edit profile functionality coming soon!');
        // In future: Redirect to edit form or open modal
    });

    // Social links click event
    const socials = document.querySelectorAll('.socials a');
    socials.forEach((link, index) => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', () => {
            switch (index) {
                case 0:
                    window.open('https://instagram.com', '_blank');
                    break;
                case 1:
                    window.open('https://discord.com', '_blank');
                    break;
                case 2:
                    window.open('https://twitter.com', '_blank');
                    break;
                default:
                    console.log("Unknown social link clicked.");
            }
        });
    });

    // Menu item click tracking (can be replaced with navigation)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`Clicked: ${item.textContent.trim()}`);
            alert(`Redirecting to ${item.textContent.trim()} (not implemented)`);
        });
    });

    // Bottom nav active state (UX)
    const bottomLinks = document.querySelectorAll('.bottombar a');
    bottomLinks.forEach(link => {
        if (link.href.endsWith('profile.html')) {
            link.querySelector('i').style.color = '#00fff7';
        }
    });
});
