const cells = document.querySelectorAll(".cell");
const statusMessage = document.getElementById("statusMessage");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Yutuqli kombinatsiyalar (indexlar)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Qatorlar
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Ustunlar
    [0, 4, 8], [2, 4, 6]             // Diagonallar
];

function handleCellClick(e) {
    const clickedCell = e.target;
    // index qatorini olish
    const cellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (board[cellIndex] !== "" || !gameActive) return;

    // Qiymatni kiritish
    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // rang berish (x yoki o classi)

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    // G'oliblarni izlash
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `O'yinchi "${currentPlayer}" G'alaba Qozondi! 🎉`;
        gameActive = false;
        return;
    }

    // Durang holati
    let roundDraw = !board.includes("");
    if (roundDraw) {
        statusMessage.textContent = "Do'stlik g'alaba qozondi! Durang. 🤝";
        gameActive = false;
        return;
    }

    // O'yinchini almashtirish
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `O'yinchi "${currentPlayer}" - Navbat sizda!`;
}

window.restartGame = function() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusMessage.textContent = `O'yinchi "X" - Navbat sizda!`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}

// Barcha yacheykalarga hodisa (event) qo'shish
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
