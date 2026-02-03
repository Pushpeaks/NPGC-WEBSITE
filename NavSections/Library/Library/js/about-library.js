document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('.stat-card, .info-box, .time-box, .feat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';
        item.style.transition = 'all 0.4s ease-out';
        observer.observe(item);
    });
});