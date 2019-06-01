//get the DOM elements
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const store_canvas = document.getElementById('store');
const store_context = store_canvas.getContext('2d');
const next_canvas = document.getElementById('next');
const next_context = next_canvas.getContext('2d');

const enemyCanvas = document.getElementById('enemy_tetris');
const enemyContext = enemyCanvas.getContext('2d');
const enemy_store_canvas = document.getElementById('enemy_store');
const enemy_store_context = enemy_store_canvas.getContext('2d');
const enemy_next_canvas = document.getElementById('enemy_next');
const enemy_next_context = enemy_next_canvas.getContext('2d');

context.scale(20, 20);
store_context.scale(20, 20);
next_context.scale(20, 20);
enemyContext.scale(20, 20);
enemy_store_context.scale(20, 20);
enemy_next_context.scale(20, 20);

//Possible blocks
const pieces = 'TJLOSZI';

//blocks' color
const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

//create new block and return to matrix
function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

const target_block = {
	pos: {x: 0, y: 0},
	matrix: null,
};

const store_block = {
	matrix: null,
};

const next_block = {
	matrix: null,
};

/* We will reassign these
 * while receiving message,
 * so we make it let rather than const
*/
let enemy_player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

let enemy_target_block = {
    pos: {x: 0, y: 0},
    matrix: null,
};

let enemy_store_block = {
    matrix: null,
};

let enemy_next_block = {
    matrix: null,
};