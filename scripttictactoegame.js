document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const restartButton = document.getElementById('restartButton');

  let currentPlayer = 'X';
  let cells = Array.from({ length: 9 }, (_, index) => index);

  function renderBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cells[index] !== 'X' && cells[index] !== 'O' ? '' : cells[index];
      cellElement.addEventListener('click', () => handleMove(index));
      board.appendChild(cellElement);
    });
  }

  function handleMove(index) {
    if (typeof cells[index] === 'number') {
      cells[index] = currentPlayer;
      renderBoard();
      if (checkForWin()) {
        alert(`${currentPlayer} wins!`);
        restart();
      } else if (isBoardFull()) {
        alert('It\'s a draw!');
        restart();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function checkForWin() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
  }

  function isBoardFull() {
    return cells.every(cell => cell === 'X' || cell === 'O');
  }

  function restart() {
    currentPlayer = 'X';
    cells = Array.from({ length: 9 }, (_, index) => index);
    renderBoard();
  }

  restartButton.addEventListener('click', restart);

  renderBoard();
});
