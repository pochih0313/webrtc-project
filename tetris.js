function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        } 

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}


function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerReset() {
	if(next_block.matrix === null)
		next_block.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.matrix = next_block.matrix;
    next_block.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    // player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    setTargetBlock();
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        setTargetBlock();
        updateScore();
    }
}

function setTargetBlock() {
	target_block.pos.x = player.pos.x;
	target_block.matrix = player.matrix;

	target_block.pos.y = 0;
	for(; !collide(arena, target_block); target_block.pos.y++);
	target_block.pos.y--;
}

function set_store_block() {
	if(store_block.matrix === null) {	
		store_block.matrix = player.matrix;
		player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
		
	}
	else {
		let temp_matrix = {};
		temp_matrix.matrix = player.matrix;
		player.matrix = store_block.matrix;
		store_block.matrix = temp_matrix.matrix;
	}
	setTargetBlock();
	draw();
	drawStore(store_block.matrix, {x: 0, y: 0}, store_canvas, store_context);
}

let dropCounter = 0;
let dropInterval = 1000;
let timeCounter = 0;
let timeInterval = 1000;
let gameOver = 0;
let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
        dropCounter = 0;
        
    }

    timeCounter += deltaTime;
    if(timeCounter > timeInterval)
    {
        
        seconds -= 1;
        if(seconds == 0)
        {
            if(minutes != 0)
            {
                seconds = 60;
                minutes -= 1;
            }
            else
                gameOver = 1;
        }   
        //update count down clock
        
        document.getElementById("time").innerHTML = minutes + ":" + seconds;
        sendMessage();
        timeCounter = 0;
    }
    lastTime = time;
    draw();
    if(!gameOver)
    {
        //Make update run continously
        //And send game status
        requestAnimationFrame(update);
    }
    if(gameOver){
        alert("You Lose!");
    }

}


function playerstop(){
    alert("stop");
}


function updateScore() {
    document.getElementById('your_score').innerText = player.score;
    document.getElementById('enemy_score').innerText = enemy_player.score;


}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {			//move to the right
        playerMove(-1);
        setTargetBlock();
    } else if (event.keyCode === 39) {	//move to the right
        playerMove(1);
        setTargetBlock();
    } else if (event.keyCode === 40) {	//drop quickly
        playerDrop();
    } else if (event.keyCode === 38) {	//rotate the block
        playerRotate();
        setTargetBlock();
    } else if (event.keyCode === 32) {	//press white space
    	playerDropToBottom();
    } else if (event.keyCode === 16) {
    	set_store_block();
    } else if (event.keyCode === 80) {
        playerstop();
    }
    //each time the player moving the block
    //send message
    sendMessage();
});



let minutes = 1;
let seconds = 60;
// playerReset();
// updateScore();
// update();
