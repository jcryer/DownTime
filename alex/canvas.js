var canvas = document.querySelector('canvas');


var c = canvas.getContext('2d'); // c stands for context

var canvas;
const WIDTH = 640;
const HEIGHT = 480;
var x = 200;
var y = 10;
var velx = 1;
var heights = [10,30,50,70,90];
var pos = [12,45,56,70,23];
var vel = [1,-1,1,-1,1];
var playerx = 150
var keyboardinput = 0;
var cooldown = 100;
;


function animate(){
	//c.fillRect(0,0,WIDTH,HEIGHT);
	//c.fillStyle = "#FFFFFF";
	cooldown =  cooldown + 1;
			
	//c.fillStyle = "#FF0000"
	c.clearRect(0,0,WIDTH,HEIGHT);
	c.fillRect(playerx,canvas.height-10,10,10);
	
	document.addEventListener('keydown', function(event){
		var key_press = String.fromCharCode(event.keyCode);
		keyboardinput = event.keyCode;
	})
	//37 is left and 39 is right
	if(keyboardinput == 37 && playerx>0 ){
		playerx = playerx -10;
	}
	else if(keyboardinput == 39 && playerx<canvas.width-10){
		playerx = playerx + 10;
	}
	else if (keyboardinput == 32){
		cooldown = 0;
		for(var i =0; i < pos.length; i++){
			if(playerx > pos[i] - 5 && playerx < pos[i] + 5){
				heights[i] = 2000;
			}
		}
	}
	keyboardinput = 0;
	console.log(cooldown);
	//console.log(keyboardinput);
	

	for(var i =0 ; i < heights.length; i++){
		c.fillRect(pos[i], heights[i], 10, 10);
		c.fillRect(x,y,10,10);
		if(pos[i] > canvas.width-10){
			vel[i] = -vel[i];
		}
		if(pos[i] < 0){
			vel[i] = -vel[i];
		}
		pos[i] += vel[i];

	}
	if(true){
		requestAnimationFrame(animate);
	}

}
animate();
;