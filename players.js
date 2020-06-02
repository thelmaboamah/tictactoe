export default class Players {
    static playerX = {
        element: document.getElementById('player-x'),
        value: 'X',
        isActive: true,
        wins: 0
    }

    static playerO = {
        element: document.getElementById('player-o'),
        value: 'O',
        isActive: false,
        wins: 0
    }

    static getActivePlayer() {
        if (this.playerX.isActive) {
            return this.playerX;
        } else if (this.playerO.isActive) {
            return this.playerO;
        }
    }

    static toggleActivePlayer() {
        if (this.playerX.isActive) {
            this.playerX.isActive = false;
            this.playerX.element.classList.remove('active');

            this.playerO.isActive = true;
            this.playerO.element.classList.add('active');
        } else if (this.playerO.isActive) {
            this.playerO.isActive = false;
            this.playerO.element.classList.remove('active');

            this.playerX.isActive = true;
            this.playerX.element.classList.add('active');
        }      
    }
}