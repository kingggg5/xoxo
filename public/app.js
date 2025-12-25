let currentPlayer = 'X';
let gridSize;
let grid;
let gridContainer = document.getElementById('grid-container');
let historyContainer = document.getElementById('history-container');
let moves = [];

function createGrid() {
    gridSize = parseInt(document.getElementById('grid-size').value);
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gridContainer.className = 'grid';
    moves = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gridContainer.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;

    if (grid[row][col] === null) {
        grid[row][col] = currentPlayer;
        moves.push({ player: currentPlayer, row: parseInt(row), col: parseInt(col) });
        event.target.innerText = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());

        if (checkWin(parseInt(row), parseInt(col))) {
            alert(`Player ${currentPlayer} wins!`);
            saveGameHistory(currentPlayer);
            resetGame();
        } else if (moves.length === gridSize * gridSize) {
            alert("It's a draw!");
            saveGameHistory('Draw');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(row, col) {
    if (grid[row].every(cell => cell === currentPlayer)) return true;
    if (grid.every(row => row[col] === currentPlayer)) return true;
    if (grid.every((_, idx) => grid[idx][idx] === currentPlayer)) return true;
    if (grid.every((_, idx) => grid[idx][gridSize - idx - 1] === currentPlayer)) return true;

    return false;
}

async function saveGameHistory(winner) {
    const gameData = {
        gridSize: gridSize,
        moves: moves,
        winner: winner,
    };

    try {
        const response = await fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });
        const result = await response.json();
        console.log('Game saved:', result);
    } catch (error) {
        console.error('Error saving game:', error);
    }
}

async function showHistory() {
    try {
        const response = await fetch('http://localhost:3000/api/games');
        const history = await response.json();
        displayHistory(history);
    } catch (error) {
        console.error('Error fetching history:', error);
    }
}

function displayHistory(history) {
    historyContainer.innerHTML = '<h2>History</h2>';
    history.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'history-game';
        gameDiv.innerHTML = `
            <p>Grid Size: ${game.gridSize}</p>
            <p>Winner: ${game.winner}</p>
            <button onclick='replayGame(${JSON.stringify(game.moves)})'>Replay</button>
        `;
        historyContainer.appendChild(gameDiv);
    });
}

function replayGame(moves) {
    createGrid();
    moves.forEach(move => {
        const cell = document.querySelector(`[data-row='${move.row}'][data-col='${move.col}']`);
        cell.innerText = move.player;
        grid[move.row][move.col] = move.player;
        cell.classList.add(move.player.toLowerCase());
    });
}

function resetGame() {
    currentPlayer = 'X';
    createGrid();
    moves = [];
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-game').addEventListener('click', createGrid);
    document.getElementById('show-history').addEventListener('click', showHistory);
    createGrid();
});
