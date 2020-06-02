import Players from './players.js';
import Square from './square.js';

export default class Board {
    static allSquares = [];
    static numOfSquaresFilled = 0;

    static init() {
        let squares = document.getElementsByClassName('square');
        let position = 1;
        for(let square of squares) {
            let s = new Square(position, square);
            Board.allSquares.push(s);
            position++;
        }
    }

    static checkForWinner() {
        if (Board.numOfSquaresFilled < 5) { //no need to check for winner until there have been 5 or more plays
            return false;
        } else {
            return Board.check(Players.playerX) || Board.check(Players.playerO);
        }
    }

    static check(player) {
        let positions = [];

        for (let square of Board.allSquares) { 
            if (square.value === player.value) {
                positions.push(square.position);
            }
        } 

        let acrossTop = (positions.includes(1) && positions.includes(2) && positions.includes(3));
        let acrossMiddle = (positions.includes(4) && positions.includes(5) && positions.includes(6));
        let acrossBottom = positions.includes(7) && positions.includes(8) && positions.includes(9);

        const downLeft = (positions.includes(1) && positions.includes(4) && positions.includes(7));
        const downMiddle = (positions.includes(2) && positions.includes(5) && positions.includes(8));
        const downRight = (positions.includes(3) && positions.includes(6) && positions.includes(9));

        const diagonalFromLeft = (positions.includes(1) && positions.includes(5) && positions.includes(9));
        const diagonalFromRight = (positions.includes(3) && positions.includes(5) && positions.includes(7));

        if (acrossTop) {
            Board.allSquares[0].element.classList.add('highlight');
            Board.allSquares[1].element.classList.add('highlight');
            Board.allSquares[2].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (acrossMiddle) {
            Board.allSquares[3].element.classList.add('highlight');
            Board.allSquares[4].element.classList.add('highlight');
            Board.allSquares[5].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (acrossBottom) {
            Board.allSquares[6].element.classList.add('highlight');
            Board.allSquares[7].element.classList.add('highlight');
            Board.allSquares[8].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (downLeft) {
            Board.allSquares[0].element.classList.add('highlight');
            Board.allSquares[3].element.classList.add('highlight');
            Board.allSquares[6].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (downMiddle) {
            Board.allSquares[1].element.classList.add('highlight');
            Board.allSquares[4].element.classList.add('highlight');
            Board.allSquares[7].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (downRight) {
            Board.allSquares[2].element.classList.add('highlight');
            Board.allSquares[5].element.classList.add('highlight');
            Board.allSquares[8].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (diagonalFromLeft) {
            Board.allSquares[0].element.classList.add('highlight');
            Board.allSquares[4].element.classList.add('highlight');
            Board.allSquares[8].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else if (diagonalFromRight) {
            Board.allSquares[2].element.classList.add('highlight');
            Board.allSquares[4].element.classList.add('highlight');
            Board.allSquares[6].element.classList.add('highlight');
            Board.updateWins(player);
            positions = [];
            return true;
        } else {
            return false;
        }
    }

    static disable() {
        for (let square of Board.allSquares) {
            square.element.onclick = null;
        }
    }

    static updateWins(player) {
        player.wins++;
        player.element.lastElementChild.innerText = player.wins; //rigid, better if I use the className but OK for now
    }

    static showRestart() {
        const restart = document.getElementById('restart');
        restart.classList.remove('hide');

        const restartBtn = document.getElementById('restart-btn');
        restartBtn.onclick = () => Board.reset();
    }

    static reset() {
        const restart = document.getElementById('restart');
        restart.classList.add('hide');

        for (let square of Board.allSquares) {
            square.clear();
        }

        Board.init();
    }
    
}