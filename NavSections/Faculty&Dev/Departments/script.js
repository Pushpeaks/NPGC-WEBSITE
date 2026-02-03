  const cards = document.querySelectorAll('.faculty-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // performance boost
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  cards.forEach(card => observer.observe(card));

 