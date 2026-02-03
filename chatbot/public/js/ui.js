function toggleChat() {
    const widget = document.getElementById("chat-widget");
    const botIcon = document.getElementById("bot-icon");
    const closeIcon = document.getElementById("close-icon");

    if (widget.style.display === "none" || widget.style.display === "") {
        widget.style.display = "flex";  
        botIcon.style.display = "none";    
        closeIcon.style.display = "block"; 
        setTimeout(() => document.getElementById("user-input").focus(), 200);
    } else {
        widget.style.display = "none";     
        botIcon.style.display = "block";   
        closeIcon.style.display = "none";   
    }
}
