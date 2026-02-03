document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("newsBtn");
  const panel = document.getElementById("newsPanel");

  // Panel open on load (already has class "open")

  // Function to update button icon based on panel state
  function updateButtonIcon() {
    const isOpen = panel.classList.contains("open");
    btn.innerHTML = isOpen ? "✕" : "📰";
  }

  // Initialize button icon
  updateButtonIcon();

  btn.addEventListener("click", () => {
    const isOpen = panel.classList.contains("open");

    if (isOpen) {
      panel.classList.remove("open");
      panel.classList.add("closed");
    } else {
      panel.classList.add("open");
      panel.classList.remove("closed");
    }

    // Update button icon after toggle
    updateButtonIcon();
  });

  // Add scroll event listener to close panel when scrolling down
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Check if scrolling down and panel is open
    if (scrollTop > lastScrollTop && panel.classList.contains("open")) {
      panel.classList.remove("open");
      panel.classList.add("closed");
      updateButtonIcon();
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

});
