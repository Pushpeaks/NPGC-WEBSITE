function openTab(evt, tabName) {

    // Hide all content
    let contents = document.querySelectorAll(".facility-content");
    contents.forEach(c => c.classList.remove("active"));

    // Remove active from cards
    let cards = document.querySelectorAll(".facility-card");
    cards.forEach(c => c.classList.remove("active"));

    // Show selected content
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
