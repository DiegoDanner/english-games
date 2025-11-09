document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            const isLight = body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            themeToggleBtn.textContent = isLight ? "🌙" : "🌞";
        });
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        body.classList.add("light-mode");
        if (themeToggleBtn) {
            themeToggleBtn.textContent = "🌙";
        }
    } else {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = "🌞";
        }
    }
});
