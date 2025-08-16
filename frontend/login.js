// login.js

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.querySelector(".eye-icon");
    const loginBtn = document.querySelector(".login-btn");
    const usernameInput = document.getElementById("username");

    // Toggle password visibility
    eyeIcon.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        eyeIcon.textContent = isPassword ? "🙈" : "👁️";
    });

    // Login button click
    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Login successful!");
                // Redirect or update UI
                window.location.href = "http://localhost:3000/frontend/home.html";
            } else {
                alert(data.message || "Login failed!");
            }
        } catch (err) {
            alert("Error connecting to server.");
        }
    });

    // Optional: Enter key submits the form
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            loginBtn.click();
        }
    });
});
