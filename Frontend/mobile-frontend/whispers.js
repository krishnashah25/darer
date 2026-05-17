document.addEventListener("DOMContentLoaded", () => {
    const chatItems = document.querySelectorAll(".chat-item");
    const tabs = document.querySelectorAll(".tab");
  
    // Highlight active tab
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  
    // Add click functionality to chat items
    chatItems.forEach(item => {
      item.addEventListener("click", () => {
        const user = item.querySelector("h4").textContent;
        const message = item.querySelector("p").textContent;
        alert(`Opening chat with ${user}:\n"${message}"`);
        // You can replace the alert with: window.location.href = 'chat.html';
      });
  
      // Add hover effect (already styled in CSS but can do more)
      item.addEventListener("mouseenter", () => {
        item.style.boxShadow = "0 0 10px #ff00ff55";
      });
      item.addEventListener("mouseleave", () => {
        item.style.boxShadow = "none";
      });
    });
  
    // (Optional) If you add a search bar later
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.toLowerCase();
        chatItems.forEach(item => {
          const username = item.querySelector("h4").textContent.toLowerCase();
          const message = item.querySelector("p").textContent.toLowerCase();
          item.style.display = (username.includes(searchValue) || message.includes(searchValue)) ? "flex" : "none";
        });
      });
    }
  });
  