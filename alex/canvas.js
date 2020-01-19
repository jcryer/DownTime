var canvas = document.querySelector('canvas');


var c = canvas.getContext('2d'); // c stands for context

var canvas;
const WIDTH = 640;
const HEIGHT = 480;
var x = 200;
var y = 10;
var velx = 1;
var heights = [10,30,50,70,90];
var setheights = [10,30,50,70,90];
var pos = [12,45,56,70,23];
var vel = [1,-1,1,-1,1];
var playerx = 150;
var keyboardinput = 0;
var cooldown = 0;
var winamount = Math.random()*10 + 10;
turnstoback = [-100,-100,-100,-100,-100];
var currentscore = 0;
var starttime = 0;
var endtime = 0;
var delay = 100000;
var chosen = 0;



function animate(){
	endtime = endtime + 1;
	if(delay > 0){
		delay = delay -1;
	}
	//c.fillRect(0,0,WIDTH,HEIGHT);
	//c.fillStyle = "#FFFFFF";

	//c.fillStyle = "#FF0000"
	if(currentscore > winamount){
		console.log("You have won this game");
		window.top.postMessage('done','*');
	}
	c.clearRect(0,0,WIDTH,HEIGHT);
	c.fillRect(playerx,canvas.height-10,10,10);
	console.log(delay);
	if(delay < 15){
		if(delay==0){
			delay =10000;
		}
		c.beginPath();
		c.moveTo(pos[chosen],heights[chosen]);
		c.lineTo(pos[chosen],400);
		c.stroke();
	}

	document.addEventListener('keydown', function(event){
		var key_press = String.fromCharCode(event.keyCode);
		keyboardinput = event.keyCode;
	})
	//37 is left and 39 is righ
	if(keyboardinput == 37 && playerx>0 ){
		playerx = playerx -10;
	}
	else if(keyboardinput == 39 && playerx<canvas.width-10){
		playerx = playerx + 10;
	}
	else if (keyboardinput == 32 && endtime - starttime > 100){
		starttime = 0;
		endtime = 0;
		for(var i =0; i < pos.length; i++){
			if(playerx > pos[i] - 5 && playerx < pos[i] + 5){
				heights[i] = 2000;
				turnstoback[i] = 100;
				currentscore = currentscore + 1;
				if(currentscore > 7){
					for(var i=0; i<setheights.length;i++){
						setheights[i] = setheights[i] + 0.5;
					}
				}

			}
		}
	}
	keyboardinput = 0;

	if(Math.random()>0.99 && delay > 200 ){
		chosen = Math.floor(Math.random()*5);
		delay = 100;
	}


	for(var i =0; i < turnstoback.length;i++){
		if(turnstoback[i] > 0){
			turnstoback[i] = turnstoback[i] - 1;
		}
		else if(turnstoback[i] > -50){
			heights[i] = setheights[i];
			turnstoback[i] = -100;
		}
	}
	for(var i =0 ; i < heights.length; i++){
		c.fillRect(pos[i], heights[i], 10, 10);
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
