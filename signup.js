// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.querySelector(".usernmame input");
    const passwordInput = document.querySelector(".password-box input");
    const phoneInput = document.querySelector(".phone-box input");
    const signupBtn = document.querySelector(".signup-btn");
    const eyeIcon = document.querySelector(".eye-icon");
    const closeBtn = document.querySelector(".close");

    const monthSelect = document.querySelector(".dob select:nth-child(1)");
    const daySelect = document.querySelector(".dob select:nth-child(2)");
    const yearSelect = document.querySelector(".dob select:nth-child(3)");

    // Populate Month, Day, Year dropdowns
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    months.forEach((month, i) => {
        const opt = document.createElement("option");
        opt.value = i + 1;
        opt.textContent = month;
        monthSelect.appendChild(opt);
    });

    for (let i = 1; i <= 31; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        daySelect.appendChild(opt);
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        yearSelect.appendChild(opt);
    }

    // Show/hide password
    eyeIcon.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        eyeIcon.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Close box (optional: hide or navigate)
    closeBtn.addEventListener("click", () => {
        document.querySelector(".overlay").style.display = "none";
    });

    // Enable button when inputs are filled
    function validateInputs() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const phone = phoneInput.value.trim();
        const month = monthSelect.value;
        const day = daySelect.value;
        const year = yearSelect.value;

        if (
            username !== "" &&
            password.length >= 6 &&
            phone.length >= 10 &&
            month !== "Month" &&
            day !== "Day" &&
            year !== "Year"
        ) {
            signupBtn.disabled = false;
            signupBtn.style.backgroundColor = "#ff00ff";
            signupBtn.style.color = "#fff";
            signupBtn.style.cursor = "pointer";
        } else {
            signupBtn.disabled = true;
            signupBtn.style.backgroundColor = "#3a3a3d";
            signupBtn.style.color = "#aaa";
            signupBtn.style.cursor = "not-allowed";
        }
    }

    // Check on every input change
    [usernameInput, passwordInput, phoneInput, monthSelect, daySelect, yearSelect].forEach((el) => {
        el.addEventListener("input", validateInputs);
    });
});
