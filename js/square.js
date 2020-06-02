import Players from './players.js';
import Board from './board.js';

export default class Square {
    constructor(position, element) {
        this.position = position; // value between 1 and 9 inclusive
        this.element = element; // DOM element
        this.isOccupied = false;
        this.value = null; // X or O

        this.element.onclick = () => this.select(this.isOccupied);
    }

    select(isOccupied) {
        if (!isOccupied) {
           this.fill();
           this.isOccupied = true;

           if (Board.checkForWinner()) {
               Board.disable();
           } else {
               Players.toggleActivePlayer();
           }
        }
    }

    fill() {
        const player = Players.getActivePlayer();
        this.element.innerText = player.value;
        this.value = player.value;
        Board.numOfSquaresFilled++;
    }
}