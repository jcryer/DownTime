$(document).ready(function() {

    var canvas = document.getElementById("canvas");
    window.addEventListener( "keydown", keyDown, true);
    var ctx = canvas.getContext("2d");
	var virusImage = new Image();
    var tick = 0;
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
            if (dir == 0) {
                if (map[this.x][this.y-1] == 0) {
                    return true;
                }
            }
            if (dir == 1) {
                if (map[this.x+1][this.y] == 0) {
                    return true;
                }
            }
            if (dir == 2) {
                if (map[this.x][this.y+1] == 0) {
                    return true;
                }
            }
            if (dir == 3) {
                if (map[this.x-1][this.y] == 0) {
                    return true;
                }
            }
            return false;
        }
        
        move (dir) {
            if (dir == 0) {
                this.y -=1;
            }
            if (dir == 1) {
                this.x += 1;
                
            }
            if (dir == 2) {
                this.y += 1;
            }
            if (dir == 3) {
                this.x -=1;
            }
        }
        
        draw() {
           ctx.drawImage(virusImage, this.x*50+100, this.y*50+200, 51,48);
        }
    }
    
    class Avast {
        constructor(x, y) {
           this.x = x;
           this.y = y;
        }
        
        move (dir) {
            if (dir == 0) {
                this.y -=1;
            }
            if (dir == 1) {
                this.x += 1;
                
            }
            if (dir == 2) {
                this.y += 1;
            }
            if (dir == 3) {
                this.x -=1;
            }
        }
        
        checkMove(dir) {
            if (dir == 0) {
                if (map[this.x][this.y-1] == 0) {
                    return true;
                }
            }
            if (dir == 1) {
                if (map[this.x+1][this.y] == 0) {
                    return true;
                }
            }
            if (dir == 2) {
                if (map[this.x][this.y+1] == 0) {
                    return true;
                }
            }
            if (dir == 3) {
                if (map[this.x-1][this.y] == 0) {
                    return true;
                }
            }
            return false;
        }
        draw() {
           ctx.drawImage(avastImage, this.x*50+100, this.y*50+200, 51,48);
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
    
    var v = new Virus(1, 1);
    v.draw();
    
    var a1 = new Avast(9, 1);
    a1.draw();
    
    function fillRect(x,y){
        ctx.fillStyle = "#666666";
        ctx.fillRect(x,y,50,50);
    }
    gameLoop();
    function gameLoop() {
        tick += 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap();
        if (a1.x == v.x && a1.y == v.y) {
            v = null;
        }
        a1.draw();
        
        if (tick % 10 == 0) {
            var x = getRandomInt(0, 3);
            if (v.checkMove(x)) {
                v.move(x);
            }
        }
        v.draw();
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
    
    function keyDown(e) {
        console.log("hello");
			if(e.keyCode == 37){
				if (a1.checkMove(3)) {
                    a1.move(3);
                }
                
			}else if(e.keyCode == 39){
			 if (a1.checkMove(1)) {
                    a1.move(1);
                }
			}else if(e.keyCode == 38){
			 if (a1.checkMove(0)) {
                    a1.move(0);
                }
			}else if(e.keyCode == 40){
			 if (a1.checkMove(2)) {
                    a1.move(2);
                }
			}
		}
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


});