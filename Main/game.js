class Virus {
   constructor(virusType) {
       this.virusType = virusType;
       this.distance = 200;  
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
    }
    
    isAttacked() {
        return this.beingAttacked;
    }
    
    attack() {
        this.beingAttacked = true;
    }
}

const VirusTypes = Object.freeze({"test":1, "test2":2, "test3":3});

var loopVar;
// Tracks the time until a new virus should be spawned
var newVirus;

// Viruses gradually come faster and faster, this modifier affects that
var newVirusModifier = 1;

var health;

var incomingViruses = [];

function gameStart() {
    newVirus = 0;
    health = 100;
    changeComputer(0);
    changeHealthBar();
    loopVar = setInterval(gameLoop,1000);
}

function gameLoop() {
    loseTimeToVirus();
    checkViruses();
    // Needs to do actual minigame shit
}


function loseTimeToVirus() {
    newVirus -= 1;
    if (newVirus <= 0) {
        spawnNewVirus();
        var spawnTime = 200/newVirusModifier;
        newVirus = getRandomInt(spawnTime, spawnTime*3);
    }
}

// Creates a new virus
function spawnNewVirus() {
    var virus = new Virus(VirusTypes.test2);
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

// 0: standard 1: slightly broken 2: not doing great
function changeComputer(computerType) {
    $("#computer").attr("src", "sprites/Computer" +  computerType + ".png");
}

function loseGame() {
    clearInterval(loopVar);
}



// Misc methods
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

