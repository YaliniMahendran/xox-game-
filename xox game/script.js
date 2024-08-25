const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const playerScore = document.getElementById('playerScore');
const phoneScore = document.getElementById('phoneScore');
const statusDisplay = document.getElementById('status');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let playerPoints = 0;
let phonePoints = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateScore();
        statusDisplay.textContent = `🎉 Congratulations! Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateScore() {
    if (currentPlayer === "X") {
        playerPoints++;
        playerScore.textContent = playerPoints;
    } else {
        phonePoints++;
        phoneScore.textContent = phonePoints;
    }
}

function handleResetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "";

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', handleResetGame);
