$(document).ready(function() {

    var canvas = document.getElementById("canvas");
    window.addEventListener( "keydown", this.keyDown, true);
    var ctx = canvas.getContext("2d");
	var virusImage = new Image();
    virusImage.src = "virus.png";
    
    var avastImage = new Image();
    avastImage.src = "avast.png";
    //requestAnimationFrame(mainLoop);
    
    class Virus {
        constructor(x, y) {
           this.x = x;
           this.y = y;
        }
        
        // 0: up 1: right 2: down 3: left
        checkMove(dir) {
        }
        draw() {
           ctx.drawImage(virusImage, this.x, this.y, 51,48);
        }
    }
    
    class Avast {
        constructor(x, y) {
           this.x = x;
           this.y = y;
        }
        
        // 0: up 1: right 2: down 3: left
        checkMove(dir) {
        }
        draw() {
           ctx.drawImage(avastImage, this.x, this.y, 51,48);
        }
    }

    var map = [ [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
                [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
                [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
    var v = new Virus(150, 250);
    v.draw();
        var v2 = new Virus(200, 250);
    v2.draw();
    
    var a1 = new Avast(400, 250);
    a1.draw();
    
    function fillRect(x,y){
        ctx.fillStyle = "#666666";
        ctx.fillRect(x,y,50,50);
    }
    
    gameLoop();
    function gameLoop() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawMap();
        a1.draw();
        v.draw();
        v2.draw();
		        requestAnimationFrame(gameLoop);
        
    }
    function drawMap() {
        for (var x = 0; x < 12; x++) {
            for (var y= 0; y < 12; y++) {
                if (map[x][y] == 1) {
                    fillRect(x*50+100, y*50+200);
                }
            }
        }       
    }

});