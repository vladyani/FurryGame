function Furry() {

    this.x = 0;
    this.y = 0;
    this.direction = "right";

}


function Coin() {

    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}


function Game() {
    var self = this;
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;


    this.index = function (x, y) {
        return x + (y * 10);
    }



    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }




    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }



    this.hideVisibleFurry = function () {
        let furryEl = document.querySelector(".furry");
        if (furryEl) {
            furryEl.classList.remove("furry"); 
        }
    }




    this.moveFurry = function () { 
        this.hideVisibleFurry();
        var direction = this.furry.direction;
        if (direction === "right") {
            this.furry.x += 1;
        } else if (direction === "left") {
            this.furry.x -= 1;
        } else if (direction === "up") {
            this.furry.y -= 1; 
        } else if (direction === "down") {
            this.furry.y += 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();

        document.addEventListener('keydown', function (event) {
            self.turnFurry(event);
        });

    }




    this.turnFurry = function (event) {

        switch (event.which) {
            case 37:
                self.furry.direction = "left";
                break;
            case 38:
                self.furry.direction = "up"; 
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 40:
                self.furry.direction = "down";
        }

    }




    this.checkCoinCollision = function () {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
            this.score++;

            let scorer = document.getElementById("score");
            scorer.innerText = this.score; 

            this.coin = new Coin(); 

            this.showCoin();
        }
    }




    this.gameOver = function () {

        if ((this.furry.x < 0 || this.furry.x > 9) || (this.furry.y < 0 || this.furry.y > 9)) {
            clearInterval(this.startGame);
            this.hideVisibleFurry();
            let endInfo = document.querySelector(".invisible");
            endInfo.style.display = "block";
            endInfo.innerText = `is Good is Good nigga Damn , please repeat :D, your score nigger: ${this.score}`;
        }

    }


    this.startGame = setInterval(function () {
        self.moveFurry()
    }, 250);

}

let gameObject = new Game();


gameObject.showFurry();
gameObject.showCoin();
gameObject.startGame;
