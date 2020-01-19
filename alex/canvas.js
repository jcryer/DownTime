var canvas = document.querySelector('canvas');


var c = canvas.getContext('2d'); // c stands for context

var canvas;
const WIDTH = 640;
const HEIGHT = 480;
var x = 200;
var y = 10;
var velx = 1;
var heights = [40,120,200,280,360];
var setheights = [40,120,200,280,360];
var pos = [12,45,56,70,23];
var vel = [1,-1,1,-1,1];
var playerx = 150;
var playerVel = 0;
var keyboardinput = 0;
var cooldown = 0;
var winamount = Math.random()*10 + 10;
turnstoback = [-100,-100,-100,-100,-100];
var currentscore = 0;
var starttime = 0;
var endtime = 0;
var delay = 100000;
var chosen = 0;
var virusImg = new Image();
virusImg.src = 'virus.png';
var background = new Image();
background.src = 'background.png';
var laser = new Image();
laser.src = 'LaserMelon.png';
var playershoot = 0;
var playerfire = true;
var anotherdelay = 0;
function animate(){

	playerx += playerVel;

	endtime = endtime + 1;
	if(delay > 0){
		delay = delay -1;
	}
	if(anotherdelay > 1){
		anotherdelay - 1;
	}
	if(anotherdelay = 1){
		playerfire = true;
	}
	//c.fillRect(0,0,WIDTH,HEIGHT);
	//c.fillStyle = "#FFFFFF";

	//c.fillStyle = "#FF0000"
	if(currentscore > winamount){
		console.log("You have won this game");
		window.top.postMessage('done','*');
	}
	c.drawImage(background, 0,0,WIDTH,HEIGHT);
	c.drawImage(laser,playerx,canvas.height-60	,60,60);
	if(delay < 15){
		if(delay==0){
			delay =10000;
		}
		c.beginPath();
		c.moveTo(pos[chosen]+30,heights[chosen]+30);
		c.lineTo(pos[chosen]+30, 500);
		c.stroke();
		if(pos[chosen] == playerx){
			playerfire = false;
			anotherdelay = 200;
		}
	}

	if(playershoot > 1){
		for(var i =0; i < pos.length; i++){
			if(playerx > pos[i] - 30 && playerx < pos[i] + 30){
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
		playershoot = playershoot - 1;
		c.beginPath();
		c.moveTo(playerx+30,canvas.height-10);
		c.lineTo(playerx+30,0);
		c.stroke();
	}
	document.addEventListener('keydown', function(event){
		var key_press = String.fromCharCode(event.keyCode);
		keyboardinput = event.keyCode;
	});
	//37 is left and 39 is righ
	if(keyboardinput == 37 && playerx>0 ){
		playerVel = -1;
	}
	else if(keyboardinput == 39 && playerx<canvas.width-10){
		playerVel = 1;
	}
	else if (keyboardinput == 32 && endtime - starttime > 100 && playerfire == true){
		starttime = 0;
		endtime = 0;
		playershoot = 10;
	}
	keyboardinput = 0;

	document.addEventListener('keyup', function(event){
		var key_press = String.fromCharCode(event.keyCode);
		if(keyboardinput == 37){
			playerVel = 0
		}
		else if(keyboardinput == 39){
			playerVel = 0;
		}
	});

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
		c.drawImage(virusImg, pos[i]-10,heights[i]-10,60,60);
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
