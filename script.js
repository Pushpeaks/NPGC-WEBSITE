// Date and Time Display
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const dateTimeString = now.toLocaleDateString('en-US', options);
  document.getElementById('date-time').textContent = dateTimeString;
}

// Update date and time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Navbar Toggle for Mobile
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
}

// News Scroller Toggle
function toggleNewsScroller() {
  const scroller = document.getElementById('news-scroller');
  const toggleBtn = document.getElementById('news-toggle');
  const newsIcon = document.getElementById('news-icon');
  const closeIcon = document.getElementById('news-close-icon');

  if (scroller.style.display === 'none' || scroller.style.display === '') {
    scroller.style.display = 'block';
    newsIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  } else {
    scroller.style.display = 'none';
    newsIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
}

// News Scroller Toggle
function toggleNewsScroller() {
  const scroller = document.getElementById('news-scroller');
  const toggleBtn = document.getElementById('news-toggle');
  const newsIcon = document.getElementById('news-icon');
  const closeIcon = document.getElementById('news-close-icon');

  if (scroller.style.display === 'none' || scroller.style.display === '') {
    scroller.style.display = 'block';
    newsIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  } else {
    scroller.style.display = 'none';
    newsIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
}

// Counting Animation for Stats
document.addEventListener('DOMContentLoaded', function() {
  const statNumbers = document.querySelectorAll('.stat-number');

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Counter animation function
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 1200; // 1.2 seconds - faster animation
    const frameRate = 8; // Update every 8ms (125fps - smoother)
    const increment = target / (duration / frameRate);
    let current = 0;

    const counter = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(counter);
        // Add + sign for larger numbers
        if (target > 100) {
          element.innerText = current + '+';
        } else {
          element.innerText = current;
        }
      } else {
        element.innerText = Math.floor(current);
      }
    }, frameRate);
  }

  // Trigger animation when stats section comes into view
  let animated = false;

  window.addEventListener('scroll', function() {
    if (!animated && statNumbers.length > 0) {
      if (isInViewport(statNumbers[0])) {
        animated = true;
        statNumbers.forEach(stat => {
          animateCounter(stat);
        });
      }
    }
  });

  // Also trigger on page load if stats are already visible
  if (statNumbers.length > 0 && isInViewport(statNumbers[0])) {
    animated = true;
    statNumbers.forEach(stat => {
      animateCounter(stat);
    });
  }
});

// News Scroller Functionality
document.addEventListener('DOMContentLoaded', function() {
  const newsPanel = document.getElementById("newsPanel");
  const toggleBtn = document.getElementById("newsToggleBtn");
  const closeBtn = document.getElementById("closeNews");
  const scroller = document.getElementById("newsScroller");
  const list = document.getElementById("newsList");

  // TOGGLE
  toggleBtn.onclick = () => newsPanel.classList.toggle("hidden");
  closeBtn.onclick = () => newsPanel.classList.add("hidden");

  // DUPLICATE LIST FOR SEAMLESS LOOP
  list.innerHTML += list.innerHTML;

  let scrollSpeed = 0.3;
  let isDragging = false;
  let startY, startScroll;

  function autoScroll() {
    if (!isDragging) {
      scroller.scrollTop += scrollSpeed;
      if (scroller.scrollTop >= list.scrollHeight / 2) {
        scroller.scrollTop = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  // MANUAL DRAG
  scroller.addEventListener("mousedown", e => {
    isDragging = true;
    scroller.style.cursor = "grabbing";
    startY = e.pageY;
    startScroll = scroller.scrollTop;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    scroller.style.cursor = "grab";
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const dy = e.pageY - startY;
    scroller.scrollTop = startScroll - dy;
  });
});