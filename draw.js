

//draw stored block
function drawStore(matrix, offset, canvas, context) {
	context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                store_context.fillStyle = colors[value];
                store_context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

//draw next block
function drawNext(matrix, offset, canvas, context) {
	context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

//draw current block
function drawMatrix(matrix, offset, context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function drawTarget_Block(matrix, offset, context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = '#BDBDBD';
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

//rendering the canvas
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0}, context);
    drawTarget_Block(target_block.matrix, target_block.pos, context);
    drawNext(next_block.matrix, {x: 0, y: 0}, next_canvas, next_context);
    drawMatrix(player.matrix, player.pos, context);
}


//rendering the canvas
function drawEnemy() {
    enemyContext.fillStyle = '#000';
    enemyContext.fillRect(0, 0, enemyCanvas.width, enemyCanvas.height);

    drawMatrix(enemyArena, {x: 0, y: 0}, enemyContext);
    drawTarget_Block(enemy_target_block.matrix, enemy_target_block.pos, enemyContext);
    drawNext(enemy_next_block.matrix, {x: 0, y: 0}, enemy_next_canvas, enemy_next_context);
    drawMatrix(enemy_player.matrix, enemy_player.pos, enemyContext);
}