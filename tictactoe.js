const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const popup = document.getElementById("popup");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer} Turn`;
    }
}
function checkWinner() {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            highlightWinner([a, b, c]);



            showPopup(`🎉 Player ${board[a]} Wins!`);
            createConfetti();
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        showPopup("😲 It's a Draw!");
    }
}

function showPopup(message) {
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}
function randomColor() {
    const colors = ["#ff0","#0ff","#f0f","#0f0","#f00","#00f"];
    return colors[Math.floor(Math.random() * colors.length)];
}
restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X Turn";

    popup.classList.remove("show");

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
});
function highlightWinner(index) {
    index.forEach(i => {
        cells[i].classList.add("winner");
    });
}
