const canvas = document.getElementById('egg');
const context = canvas.getContext('2d');
context.scale(15,15);

let score = 0;
let player = 3;
let nextPlayer = 2;
const scoreTag = document.getElementById("score");
scoreTag.innerText = "score :" +score; 

context.fillStyle = "#543";
context.fillRect(0,0,canvas.width,canvas.height);

playerMat = [[0,1,0],
		  		[1,1,1]];

nplayerMat = [[0,0,0],
				[1,1,1]];

class plate{

	constructor(x,y,isPlayer,dir,col){
		this.pos = {
			xCod : x,
			yCod : y
		} 
		this.isPlayer = isPlayer;
		this.dir = dir;
		this.col = col;
	}

    draw(){
		if(this.isPlayer){
			let matrix = playerMat;
			for(let i = 0 ;i < matrix.length ; i++){
				for(let j = 0 ; j< matrix[i].length;j++){
					if(matrix[i][j] == 1){
						context.fillStyle = this.col;
						context.fillRect(j + this.pos.xCod,i + this.pos.yCod,1,1);
					}
				}
			}
		}
		else{
			let matrix = nplayerMat;
			for(let i = 0 ;i < matrix.length ; i++){
				for(let j = 0 ; j< matrix[i].length;j++){
					if(matrix[i][j] == 1){
						context.fillStyle = this.col;
						context.fillRect(j + this.pos.xCod,i + this.pos.yCod,1,1);
					}
				}
			}
		}
	}

	move(){
		this.pos.xCod += this.dir;
		if(this.pos.xCod + 3 >= 19 || this.pos.xCod <= 0){
			this.dir = -this.dir;
		}
	}

}

let yLevel = [5,11,17,22];

let p1 = new plate(Math.floor(Math.random()*16),yLevel[0],false,1,"red");
let p2 = new plate(Math.floor(Math.random()*16),yLevel[1],false,-1,"white");
let p3 = new plate(Math.floor(Math.random()*16),yLevel[2],false,1,"blue");
let p4 = new plate(Math.floor(Math.random()*16),yLevel[3],true,-1,"green");

let arrPlt = [p1,p2,p3,p4];

let lastTime = 0;
let diffUpdate =0;

function resetCanvas(){
	for(let i = 0; i < arrPlt.length ; i++){
		arrPlt[i].pos.yCod = yLevel[(i-player+3)%4];
	}  
}

function gameOver(msg){
	alert(msg);
}

function updateScore(){
	score++;
	scoreTag.innerText = "score :" +score;
}

function jumpEgg(){
	console.log("before"+player);
	console.log("before"+nextPlayer);
	nextPlayer = (player-1) < 0 ? 3 : (player - 1);

	if(arrPlt[nextPlayer].pos.xCod >= arrPlt[player].pos.xCod - 2
		 && arrPlt[nextPlayer].pos.xCod <= arrPlt[player].pos.xCod + 2){
		player = nextPlayer;
		nextPlayer = (player-1) < 0 ? 3 : (player - 1);	
		resetCanvas();
		updateScore();
	}else{
		gameOver("Game Over.\nYour score is " +score);
	}

	for(let i = 0 ;i < arrPlt.length ;i++){
		if(i == player){
			arrPlt[i].isPlayer = true;
		}else{

			arrPlt[i].isPlayer = false;
		}
	}
	console.log("after"+player);
	console.log("after"+nextPlayer);
}

document.addEventListener("keydown",keyPressed);
function keyPressed(event){
	if(event.keyCode == 32){
		jumpEgg();
	}
}

function update(){
	//update the time
	let currentTime = new Date();
	const diffTime = currentTime - lastTime;
	lastTime = currentTime;
	diffUpdate += diffTime;
	if(diffUpdate > 700){
		context.fillStyle = "#543";
		context.fillRect(0,0,canvas.width,canvas.height);

		for(let i = 0;i < arrPlt.length ;i++){
			arrPlt[i].draw();
			arrPlt[i].move();
		}
		diffUpdate = 0;

		if(arrPlt[nextPlayer].pos.xCod >= arrPlt[player].pos.xCod - 2 
		 && arrPlt[nextPlayer].pos.xCod <= arrPlt[player].pos.xCod + 2){
			console.log("player"+arrPlt[player].pos.xCod+"\nnext"+arrPlt[nextPlayer].pos.xCod);
		}
	}

	requestAnimationFrame(update);
}

update();