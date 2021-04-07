var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE'

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/Glue.png" />';


var gBoard;
var gGamerPos;
var gBallInter;
var gGlueInter;
var gIsGlue = false;

var ballsCounter = 0;
var ballsAmount = 0;;

function initGame() {
    ballsCounter = 0
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
}


function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)


    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if ((i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) &&
                !((i === 5 && j === 0) || (i === 0 && j === 5) ||
                    (i === board.length - 1 && j === 5) || (i === 5 && j === board[0].length - 1))) {
                cell.type = WALL;
            }

            // Add created cell to The game board
            board[i][j] = cell;
        }
    }


    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)


    console.log(board);
    return board;
}

// Render the board to an HTML table
function renderBoard(board) {
    gBallInter = setInterval(putBall, 3000)
    gGlueInter = setInterval(addGlue, 5000)
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement

            cellClass = (currCell.type === FLOOR) ? cellClass += ' floor' : cellClass += ' wall';
            // if (currCell.type === FLOOR) cellClass += ' floor';
            // else if (currCell.type === WALL) cellClass += ' wall';

            //TODO - Change To template string
            strHTML += `<td class="cell '  ${cellClass} 
                '"  onclick="moveTo(' ${i} ',' ${j} ')" >`

            // TODO - change to switch case statement
            switch (currCell.gameElement) {
                case GAMER:
                    strHTML += GAMER_IMG;
                    break;
                case BALL:
                    strHTML += BALL_IMG;
                    break;
            }
            // if (currCell.gameElement === GAMER) {
            //     strHTML += GAMER_IMG;
            // } else if (currCell.gameElement === BALL) {
            //     strHTML += BALL_IMG;
            // }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    console.log('strHTML is:');
    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

    var targetCell = gBoard[i][j];

    if (targetCell.type === WALL) return;

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

        if (targetCell.gameElement === BALL) {
            console.log('Collecting!');
            ballsCounter++;
            ballsAmount--;
            document.querySelector('.score').innerText = ballsCounter;
            console.log(ballsAmount);
            if (ballsAmount === 0) {
                clearInterval(gBallInter);
                clearInterval(gGlueInter);
                document.querySelector('table').style.display = 'none'
                document.querySelector('img.win').style.display = 'block'
                document.querySelector('button.restart').style.display = 'block'
            }

        }

        if (i === 5 && j === 0) {
            i = 5;
            j = gBoard[0].length - 1;
        } else if (i === 0 && j === 5) {
            j = 5;
            i = gBoard.length - 1
        } else if (i === gBoard.length - 1 && j === 5) {
            i = 0;
            j = 5;
        } else if (i === 5 && j === gBoard[0].length - 1) {
            i = 5
            j = 0
        }

        if (gBoard[i][j].gameElement === GLUE) {
            gIsGlue = true;
            setTimeout(() => { gIsGlue = false; }, 3000)
        }
        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

        // DOM:
        renderCell(gGamerPos, GAMER_IMG);




    } //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
    if (!gIsGlue) {
        var i = gGamerPos.i;
        var j = gGamerPos.j;

        console.log('test')
        switch (event.key) {
            case 'ArrowLeft':
                moveTo(i, j - 1);
                break;
            case 'ArrowRight':
                moveTo(i, j + 1);
                break;
            case 'ArrowUp':
                moveTo(i - 1, j);
                break;
            case 'ArrowDown':
                moveTo(i + 1, j);
                break;

        }
    }

}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function putBall() {
    var i = getRandomInt(1, 9);
    var j = getRandomInt(1, 9);
    if (gBoard[i][j].gameElement === null) {

        renderCell({ i, j }, BALL_IMG);
        gBoard[i][j].gameElement = BALL;
        ballsAmount++;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function restartGame() {
    document.querySelector('img.win').style.display = 'none';
    document.querySelector('button.restart').style.display = 'none';
    document.querySelector('table').style.display = 'block';
    initGame();
}

function addGlue() {

    var i = getRandomInt(1, 9);
    var j = getRandomInt(1, 9);
    if (gBoard[i][j].gameElement === null) {
        renderCell({ i, j }, GLUE_IMG);
        gBoard[i][j].gameElement = GLUE;
    }

    setTimeout(() => {
        gBoard[i][j].gameElement = null;
        renderCell({ i, j }, null);
    }, 3000)

}