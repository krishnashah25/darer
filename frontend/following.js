// Highlight active tab
document.querySelectorAll('.tabs .tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
  
  // Mock: Show alert on button click (Sign Up, Open App)
  document.querySelector('.btn.yellow')?.addEventListener('click', () => {
    alert('Redirecting to Sign Up page...');
  });
  
  document.querySelector('.btn.pink-text')?.addEventListener('click', () => {
    alert('Launching the Darer App...');
  });
  
  // Add hover effect for stream cards
  document.querySelectorAll('.stream-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 12px #ff00ff';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
    });
  });
  
  // Example: Toggle viewer count visibility on image click
  document.querySelectorAll('.stream-card img').forEach(img => {
    img.addEventListener('click', () => {
      const viewer = img.closest('.stream-card').querySelector('.viewer-count');
      if (viewer) {
        viewer.style.display = viewer.style.display === 'none' ? 'inline-block' : 'none';
      }
    });
  });
  
  // Toast message when offline user clicked
  document.querySelectorAll('.stream-card.offline').forEach(card => {
    card.addEventListener('click', () => {
      alert('This streamer is currently offline.');
    });
  });
  