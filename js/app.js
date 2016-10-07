// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, playerInstance) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 650) {
        this.reset();
    }
    this.checkCollision(playerInstance);
};

Enemy.prototype.reset=function(){
    this.x=-60;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.checkCollision = function(playerInstance) {
    if (playerInstance.x < this.x + 75 &&
        playerInstance.x + 74 > this.x &&
        playerInstance.y < this.y + 70 &&
        65 + playerInstance.y > this.y) {
        playerInstance.reset();
    }
};





// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.prev_x = 0;
    this.prev_y = 0;
    this.hit = 0;
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
}

// Sets boundaries for the player to avoid moving
// off the screen.
Player.prototype.update = function() {

    //function pause() {
    //    console.log('im willing to wait for it wait for it.');
    //    console.log(intervalID)
    //    this.y = 380;
    //}

    //var n = 5000;
    //var intervalID = window.setInterval(pause, n);

    //
    //clearInterval(intervalID);
    //console.log('prev_x',this.prev_x,'prev_y',this.prev_y);

    if (this.x < 0) {
        this.prev_x = this.x;
        this.x = 0;
    } else if (this.x > 400) {
        this.prev_x = this.x;
        this.x = 400;
    } else if (this.y === -10) {
        this.prev_y = 2;
        this.y = 380;
    } else if (this.y > 380) {
        this.prev_y = this.y;
        this.y = 380;
    }
};

Player.prototype.reset = function() {
        this.prev_x = this.x;
        this.x = 200;
        this.prev_y = this.y;
        this.y = 380;
        this.hit = 1;
};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.prev_y === 2 && this.y === 380 && this.x === this.prev_x) {
        ctx.drawImage(Resources.get('images/Heart3.png'), this.x, this.prev_y);
    }
    if ((this.hit === 1) && (this.prev_y === 220 || this.prev_y === 140 || this.prev_y === 60)) {
            hitImg = this.prev_y === 140 ? 'images/hit-ohdear.png' : 'images/hit-ouch2.png';
            ctx.drawImage(Resources.get(hitImg), this.prev_x, this.prev_y+30);
        }
}

// Uses keystrokes to determine which way the player
// should move.
Player.prototype.handleInput = function(key) {
    function showXY(when) {
        if (when == 'b') {
            console.log('before_key_x',before_key_x,'before_key_y',before_key_y);
        } else {
            console.log('after_key_x',after_key_x,'after_key_y',after_key_y);
        }
    }

    var before_key_x = this.x;
    var before_key_y = this.y;
    var after_key_x = 0;
    var after_key_y = 0;

    showXY('b');

    //if (this.y === -10) {
    //    this.y = 380;
    //}

    this.prev_x = this.x;
    this.prev_y = this.y;
    this.hit = 0;

    switch (key) {
        case 'left':
            console.log('handleInput','37=L');
            this.x = this.x - 100;
            after_key_x = this.x;
            after_key_y = before_key_y;
            showXY('a');
            break;
        case 'up':
            if (before_key_y === 60) {
                this.y = this.y - 70;
                after_key_x = before_key_x;
                after_key_y = this.y;
                showXY('a');
            } else {
                this.y = this.y - 80;
                after_key_x = before_key_x;
                after_key_y = this.y;
                showXY('a');
            }
            console.log('handleInput','38=U');
            break;
        case 'right':
            this.x = this.x + 100;
            console.log('handleInput','39=R');
            after_key_x = this.x;
            after_key_y = before_key_y;
            showXY('a');
            break;
        case 'down':
            this.y = this.y + 80;
            console.log('handleInput','40=D');
            after_key_x = before_key_x;
            after_key_y = this.y;
            showXY('a');
            break;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-60,226,15);
var enemy2 = new Enemy(-60,142,25);
var enemy3 = new Enemy(-60,58,35);


var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(200, 380);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    console.log('addEventListener','37=L, 38=U', '39=R', '40=D',e.keyCode)
    player.handleInput(allowedKeys[e.keyCode]);
});





