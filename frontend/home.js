// Example: Darer homepage interactivity script

document.addEventListener("DOMContentLoaded", () => {
    // Section titles for dynamic rendering
    const sections = [
      "Live on Darer",
      "Just Chatting & IRL",
      "Team FPS",
      "Music",
      "Survival Games",
      "Creative",
      "Recommended Channels",
      "MOBA Games",
      "MMORPGs",
      "DJs",
      "VTubers",
      "New Games",
      "Indie Games",
      "RPGs",
      "Platformers",
      "Board Games",
      "Horror Games",
      "Sports Games",
      "Coding",
      "Sports",
      "Fighting Games",
      "Chess",
      "Animals",
      "Party Games",
      "Talk Show Streams"
    ];
  
    const container = document.getElementById("main-content");
  
    // Dynamically create sections
    sections.forEach((title) => {
      const section = document.createElement("section");
      section.classList.add("darer-section");
  
      const heading = document.createElement("h2");
      heading.textContent = title;
      heading.classList.add("darer-title");
  
      const cardRow = document.createElement("div");
      cardRow.classList.add("card-row");
  
      // Example dummy stream cards
      for (let i = 0; i < 5; i++) {
        const card = document.createElement("div");
        card.classList.add("stream-card");
        card.innerHTML = `
          <img src="https://placehold.co/300x180?text=${title.replace(/\s/g, "+")}" alt="Stream Preview">
          <div class="stream-info">
            <p class="streamer-name">Streamer ${i + 1}</p>
            <p class="viewer-count">${Math.floor(Math.random() * 9000 + 1000)} viewers</p>
          </div>
        `;
        cardRow.appendChild(card);
      }
  
      section.appendChild(heading);
      section.appendChild(cardRow);
      container.appendChild(section);
    });
  
    // Scroll animation (fade-in effect)
    const fadeInOnScroll = () => {
      const elements = document.querySelectorAll(".darer-section");
  
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("fade-in");
        }
      });
    };
  
    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Trigger on page load
  });
  