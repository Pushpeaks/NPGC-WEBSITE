const cards = document.querySelectorAll('.list-card, .success-card, .danger-card');

window.addEventListener('scroll',()=>{
    cards.forEach(card=>{
        let position = card.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;
        if(position < screenHeight - 100){
            card.style.opacity="1";
            card.style.transform="translateY(0)";
        }
    });
});

cards.forEach(card=>{
    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition="all 0.6s ease";
});
