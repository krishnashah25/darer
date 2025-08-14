document.addEventListener("DOMContentLoaded", function () {
    const retryButton = document.querySelector(".retry-btn");

    retryButton.addEventListener("click", function () {
        // Optional: Add loading effect or disable button while retrying
        retryButton.textContent = "Retrying...";
        retryButton.disabled = true;

        // Simulate retry logic (e.g., check connection or reload page)
        setTimeout(() => {
            // You can replace this with actual logic (like pinging a server)
            location.reload(); // Simple page reload
        }, 1000); // Simulate network delay
    });
});
