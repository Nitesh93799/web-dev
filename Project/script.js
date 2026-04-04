// ===== Page navigation =====
function showPage(pageId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    // Start game automatically when Game page is opened
    if (pageId === "game") {
        startGame();
    }
}

// ===== Game logic =====
const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerPos = 275; // initial left position
let score = 0;
let gameInterval;
let enemies = [];

// Player movement
document.addEventListener("keydown", (e) => {
    if (!document.getElementById("game").classList.contains("active")) return;

    if (e.key === "ArrowLeft") {
        playerPos -= 20;
        if (playerPos < 0) playerPos = 0;
        player.style.left = playerPos + "px";
    } else if (e.key === "ArrowRight") {
        playerPos += 20;
        if (playerPos > gameArea.offsetWidth - player.offsetWidth) {
            playerPos = gameArea.offsetWidth - player.offsetWidth;
        }
        player.style.left = playerPos + "px";
    }
});

// Create a new enemy
function createEnemy() {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 40)) + "px";
    enemy.style.top = "0px";
    gameArea.appendChild(enemy);
    enemies.push(enemy);
}

// Move enemies and check collision
function moveEnemies() {
    enemies.forEach((enemy, index) => {
        let top = parseInt(enemy.style.top);
        top += 5; // speed
        enemy.style.top = top + "px";

        // Collision detection
        if (top + enemy.offsetHeight >= gameArea.offsetHeight &&
            parseInt(enemy.style.left) + enemy.offsetWidth > playerPos &&
            parseInt(enemy.style.left) < playerPos + player.offsetWidth) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            gameArea.removeChild(enemy);
            enemies.splice(index, 1);
        }

        // Remove enemy if out of bounds
        if (top > gameArea.offsetHeight) {
            gameArea.removeChild(enemy);
            enemies.splice(index, 1);
        }
    });
}

// Start the game
function startGame() {
    clearInterval(gameInterval);
    score = 0;
    scoreDisplay.textContent = "Score: " + score;

    // Remove old enemies
    enemies.forEach(enemy => gameArea.removeChild(enemy));
    enemies = [];

    gameInterval = setInterval(() => {
        if (Math.random() < 0.03) createEnemy(); // random spawn
        moveEnemies();
    }, 30);
}