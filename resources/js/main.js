document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleTheme");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", function() {
        toggle_style();
    });
});

function toggle_style() {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }
}