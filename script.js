document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll("[data-cell]");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restartButton");
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let circleTurn;
    const X_CLASS = "x";
    const CIRCLE_CLASS = "circle";

    startGame();

    restartButton.addEventListener("click", startGame);

    function startGame() {
        circleTurn = false;
        cells.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.removeEventListener("click", handleClick);
            cell.addEventListener("click", handleClick, { once: true });
        });
        setBoardHoverClass();
        statusText.textContent = "X's turn";
        statusText.style.color = "green";  // Reset status text color to black at the start of the game
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }

    function endGame(draw) {
        statusText.style.color = "white";  // Set status text color to white when the game ends
        if (draw) {
            statusText.textContent = "Draw!";
        } else {
            statusText.textContent = `${circleTurn ? "O's" : "X's"} Wins!`;
        }
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        });
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        circleTurn = !circleTurn;
        statusText.textContent = `${circleTurn ? "O's" : "X's"} turn`;
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        if (circleTurn) {
            board.classList.add(CIRCLE_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }
});
