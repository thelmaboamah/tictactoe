import Players from './players.js';
import Board from './board.js';

export default class Square {
    constructor(position, element) {
        this.position = position; // value between 1 and 9 inclusive
        this.element = element; // DOM element
        this.isOccupied = false;
        this.value = null; // X or O

        // handle iOS ignoring click on div
        const ua = navigator.userAgent
        const iOS = (ua.match(/iPad/i) || ua.match(/iPhone/));
        if (iOS) {
            this.element.ontouchstart = () => this.select(this.isOccupied);
        } else {
            this.element.onclick = () => this.select(this.isOccupied);
        }
    }

    select(isOccupied) {
        if (!isOccupied) {
           this.fill();
           this.isOccupied = true;

           if (Board.checkForWinner()) {
               Board.disable();
               Board.showRestart();
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

    clear() {
        this.element.innerText = '';
    }
}