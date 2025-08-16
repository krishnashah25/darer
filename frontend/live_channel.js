// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-box input");
    const streamCards = document.querySelectorAll(".stream-card");
    const tabs = document.querySelectorAll(".tab");

    // 🔍 Live Search Functionality
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();

        streamCards.forEach(card => {
            const title = card.querySelector(".stream-title").textContent.toLowerCase();
            const streamer = card.querySelector(".streamer").textContent.toLowerCase();

            if (title.includes(searchText) || streamer.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 🟣 Tab Activation Handler (if you expand tabs in future)
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    // 📺 Click on Stream Card to go to Stream Page (You can modify this logic)
    streamCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const title = card.querySelector(".stream-title").textContent;
            console.log("Clicked on stream:", title);
            // You can redirect to another page or open a modal:
            // window.location.href = `watch_stream.html?title=${encodeURIComponent(title)}`;
        });
    });
});
