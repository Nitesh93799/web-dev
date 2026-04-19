// NEPAL TIME
function updateNepalClock() {
    const options = {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    const time = new Intl.DateTimeFormat([], options).format(new Date());
    document.getElementById("nepal-clock").innerText = time;
}

// USER TIME
function updateUserClock() {
    const now = new Date();
    document.getElementById("user-clock").innerText =
        now.toLocaleTimeString();
}

// AUTO THEME
function updateTheme() {
    const hour = new Date().getHours();

    if (hour >= 8 && hour < 18) {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
    } else {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
    }
}

// RUN EVERY SECOND
setInterval(() => {
    updateNepalClock();
    updateUserClock();
    updateTheme();
}, 1000);
