// Simple fade-in animation on scroll
const boxes = document.querySelectorAll(".achievement-box");

window.addEventListener("scroll", () => {
  boxes.forEach(box => {
    const position = box.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if(position < screenHeight - 100) {
      box.style.opacity = 1;
      box.style.transform = "translateY(0)";
    }
  });
});
