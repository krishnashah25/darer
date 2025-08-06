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
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Simulate login
        console.log("Username:", username);
        console.log("Password:", password);

        alert("Login submitted!");
    });

    // Optional: Enter key submits the form
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            loginBtn.click();
        }
    });
});
