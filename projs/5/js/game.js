'use strict'
const WALL = '#'
const FOOD = '<img class="coin" src="img/coin.gif" />'
const EMPTY = ' ';
const POWERFOOD = '<img class="power-food" src="img/superfood.gif" />'
const CHERRY = '<img class="cherry" src="img/cherry.gif" />'
var gCherryInter;
var gBestScore = 0;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gGame.score = 0;

    gBoard = buildBoard()
    console.log(gBoard)
    createPacman(gBoard);
    createGhosts(gBoard);
    // var gCherryInter = setInterval(addCherry, 15000)
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    setTimeout(() => {
        gBoard[3][5] = FOOD
        gBoard[4][5] = FOOD
        renderCell({ i: 3, j: 5 }, FOOD)
        renderCell({ i: 3, j: 4 }, FOOD)
    }, 4000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2) || (i === 3 && (j > 1 || j < 2))) {
                board[i][j] = WALL;
            }
        }
    }
    board[5][4] = WALL;
    board[5][5] = WALL;
    board[5][6] = WALL;
    board[6][6] = WALL;
    board[7][6] = WALL;

    board[1][1] = POWERFOOD;
    board[board.length - 2][board.length - 2] = POWERFOOD;
    board[board.length - 2][1] = POWERFOOD;
    board[1][board.length - 2] = POWERFOOD;

    return board;
}



function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    if (gBestScore < gGame.score) {
        gBestScore = gGame.score;
        document.querySelector('h3 span').innerText = gBestScore
    }
}

function gameOver() {
    // clearInterval(gCherryInter)
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);


    // TODO
    document.querySelector('.board-container').style.display = 'none'
    document.querySelector('img.game-over').style.display = 'block'
    document.querySelector('button.restart').style.display = 'block'

}

function restartGame() {
    // document.querySelector('body').classList.add('blur')
    document.querySelector('img.game-over').style.display = 'none';
    document.querySelector('button.restart').style.display = 'none';
    document.querySelector('.board-container').style.display = 'block';
    init();
}

function addCherry() {
    var i = 0,
        j = 0;
    while (!(gBoard[i][j] === EMPTY)) {
        i = getRandomIntInclusive(1, 8)
        j = getRandomIntInclusive(1, 8)
    }
    gBoard[i][j] = CHERRY;



}