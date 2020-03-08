var app = new Vue({
    el: '#app',
    data: {
      player: {
          name: 'YOU',
          health: 100
      },
      log: [],
      turns: 11,
      monster: {
          name: 'MONSTER',
          health: 100
      },
      difficultyMenu: false,
      gameRunning: false,
      startNewGame: true
    },
    methods: {
        showMenu() {
            this.difficultyMenu = true;
            this.startNewGame = false;
            this.log = [];
            this.player.health = 100;
            this.monster.health = 100;
            this.gameRunning = false;
        },
        startGame(turns) {
            this.difficultyMenu = false;
            this.gameRunning = true;
            this.turns = turns;
        },
        attack(special) {
            if(this.checkTurns()) {
                return;
            }
            
            console.log('sdfioushdfo');
            let damage = 0;
            if(special) {
                damage = this.randomNumber(10, 20);
            } else {
                damage = this.randomNumber(3, 10);
            }
            this.monster.health -= damage;
            this.turns--;
            this.log.unshift({
                isPlayer: true,
                text: `${this.player.name} hit ${this.monster.name} for ${damage}`
            });
            if (this.checkWin()) {
                console.log('a');
                return;
            }
            this.monsterAttack();
            this.checkWin();
        },
        monsterAttack() {
            const damage = this.randomNumber(5, 12);
            this.player.health -= damage;
            this.log.unshift({
                isPlayer: false,
                text: `${this.monster.name} hit ${this.player.name} for ${damage}`
            });
        },
        randomNumber(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if(this.player.health <= 0) {
                if (confirm('You Lost. New Game?')) {
                    console.log('c');
                    this.showMenu();
                } else {
                    this.gameRunning = false;
                } return true;
            } else if (this.monster.health <= 0) {
                if (confirm('You Won. New Game?')) {
                    console.log('d');
                    this.showMenu();
                } else {
                    this.gameRunning = false;
                } return true;
            }
            return false;
        },
        heal() {
            if(this.checkTurns()) {
                return;
            }
            if (this.player.health === 100) {
                this.log.unshift({
                    isPlayer: true,
                    text: `${this.player.name}: ${this.player.health}% health`
                });
                return;
            }
            if (this.player.health <= 89) {
                this.player.health += 11;
                this.turns--;
                this.log.unshift({
                    isPlayer: true,
                    text: `${this.player.name}: ${this.player.health}% health`
                });
            } else {
                this.log.unshift({
                    isPlayer: true,
                    text: `${this.player.name}: ${this.player.health}% health`
                });
                this.turns--;
                this.player.health = 100;
            }
            this.monsterAttack();
        },
        giveUp() {
            this.gameRunning = false;
            this.startNewGame = true;
        },
        checkTurns() {
            if(this.turns <= 0) {
                if (confirm('You Lost: No Turns Remaining. New Game?')) {
                    this.showMenu();
                    return true;
                }
                return true;
            }
        }
    }
})