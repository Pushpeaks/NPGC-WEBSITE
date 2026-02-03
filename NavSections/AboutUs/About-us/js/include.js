function loadHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

loadHTML("header", "includes/header.html");
loadHTML("footer", "includes/footer.html");
