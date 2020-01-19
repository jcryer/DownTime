$(document).ready(function() {
    class Virus {
       constructor(virusType) {
           this.virusType = virusType;
           this.x = 0;
           this.y = getRandomInt(20, 120);
           this.distance = 100;  
           this.beingAttacked = false;
       }
        getType() {
            return this.virusType;
        }

        getDistance() {
            return this.distance;
        }
        reduceDistance() {
            this.distance -= 1;
            this.x += 14;
        }

        isAttacked() {
            return this.beingAttacked;
        }

        attack() {
            this.beingAttacked = true;
        }
        draw() {
            if (this.virusType == VirusTypes.Melon) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(this.x, this.y, 10, 10);
            }
        }
    }


    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    canvas.width = 1820;
    canvas.height = 208;

    const VirusTypes = Object.freeze({"Melon":1});

var loopVar;

// Tracks the time until a new virus should be spawned
var newVirus;

// Viruses gradually come faster and faster, this modifier affects that
var newVirusModifier;

var health;

var virusesDestroyed;
var incomingViruses;

$.fn.gameStart = function(){ 
    virusesDestroyed = 0;
    newVirus = 0;
    newVirusModifier = 1;
    health = 100;
    incomingViruses = [];
    changeComputer(0);
    changeHealthBar();

    loopVar = setInterval(gameLoop,100);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    loseTimeToVirus();
    checkViruses();
    // Needs to do actual minigame shit
}

function loseTimeToVirus() {
    newVirus -= 1;
    if (newVirus <= 0) {
        spawnNewVirus();
        var spawnTime = 50/newVirusModifier;
        newVirus = getRandomInt(spawnTime, spawnTime*3);
    }
}

// Creates a new virus
function spawnNewVirus() {
    var virus = new Virus(VirusTypes.Melon);
    incomingViruses.push(virus);
}

// Deals with loseHealth
function checkViruses() { 
    var destroyedVirus = 0;
    incomingViruses.forEach(function (incomingVirus) {
        if (!incomingVirus.isAttacked()) {
            incomingVirus.reduceDistance();
            if (incomingVirus.getDistance() <= 0) {
                loseHealth();
                destroyedVirus = incomingVirus;
            }
        }
        incomingVirus.draw();
    });
    if (destroyedVirus != 0) {
        incomingViruses.pop(destroyedVirus);
    }
}

// Deals with changeHealthBar, changeComputer and loseGame
function loseHealth() {
    health -= 10;
    changeHealthBar();
    if (health <= 0) {
        loseGame();
    }
    else if (health == 50) {
        changeComputer(1);
    }
    else if (health == 20) {
        changeComputer(2);
    }
}

function changeHealthBar() {
    $("#healthBar").attr("src", "sprites/HealthBar" +  health + ".png");
}

// 0: standard 1: slightly broken 2: not doing great 3: dead
function changeComputer(computerType) {
    $("#computerImage").attr("src", "sprites/Computer" +  computerType + ".png");
}

function loseGame() {
    clearInterval(loopVar);
}


window.onmessage = function(e){
    if (e.data == "done") {
        var destroyedVirus = 0;
        incomingViruses.forEach(function (incomingVirus) {
            if (incomingVirus.isAttacked()) {
                destroyedVirus = incomingVirus;
                break;
            }
        });
        if (destroyedVirus != 0) {
            incomingViruses.pop(destroyedVirus);
            virusesDestroyed += 1;
            //newVirusModifier += 0.01;
        }
    }
};


// Misc methods

/*
*/
});
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
