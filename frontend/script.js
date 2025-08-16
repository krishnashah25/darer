document.addEventListener("DOMContentLoaded", () => {
    const playerBtn = document.querySelector(".player");
    const watcherBtn = document.querySelector(".watcher");
    const signUpBtn = document.querySelector(".signup-form button");
    const emailInput = document.querySelector(".signup-form input");
  
    playerBtn.addEventListener("click", () => {
      alert("You chose to be a PLAYER! 🎮 Feature coming soon...");
    });
  
    watcherBtn.addEventListener("click", () => {
      alert("You chose to be a WATCHER! 👀 Feature coming soon...");
    });
  
    signUpBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      if (email === "" || !validateEmail(email)) {
        alert("Please enter a valid email address.");
      } else {
        alert(`Thank you for signing up with: ${email}`);
        emailInput.value = "";
      }
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
  });
  