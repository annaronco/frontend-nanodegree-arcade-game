// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var speeds = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    this.speed = speeds[Math.floor(Math.random()*speeds.length)]
    this.x = this.random(200);
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (this.speed * dt);
    } else {
        this.x = this.random(500);
    }
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        updateScore.resetScore();
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.random = function(max) {
    return -Math.floor(Math.random()*Math.floor(max));
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(speed, x, y) {
    this.speed = speed;
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction, x, y) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -=84;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 84;
    }
}

Player.prototype.update = function() {
    if (player.y < 10) {
        updateScore.addScore();
        player.x = 200;
        player.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    enemyOne = new Enemy(100, 0, 60),
    enemyTwo = new Enemy(200, 0, 144),
    enemyThree = new Enemy(300, 0, 228)
]

// Place the player object in a variable called player
var player = new Player();

// Place a Gem every 10 score points
var Gem = function (x, y) {
    this.x = 202;
    this.y = 144;
    this.sprite = 'images/gem-blue.png';
    this.xPositions = [144, 22 , 245, 364];
    this.yPositions = [62, 143, 298, 376, 410];
}

Gem.prototype.render = function() {
    if (score % 5 === 0 && score != 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Gem.prototype.update = function() {
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        updateScore.addScore();
        this.x = -100;
        this.y = -100;
    }
    if (score % 5 === 0 && this.x === -100) {
        this.x = this.xPositions[Math.floor(Math.random()*this.xPositions.length)];
        this.y = this.yPositions[Math.floor(Math.random()*this.yPositions.length)];
    }
}

var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Player score
var score = 0;

var updateScore = {
    addScore: function() {
        score++
        document.getElementsByClassName('score')[0].innerHTML = score;
    },
    resetScore: function() {
        score = 0;
        document.getElementsByClassName('score')[0].innerHTML = score;
    }
}
