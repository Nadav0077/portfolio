'use strict'
const PACMAN = '<img class="pacman" src="img/pacman.gif" />';

var gRotate = 'ArrowLeft';
var isSuper = false;
var gPacman;
var gTmpGhosts = [];
var gTmpNums = [];

function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 4
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    // debugger
    if (!gGame.isOn) return
        // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        } else {
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    var g = gGhosts.splice(i, 1)[0];
                    gTmpGhosts.push(g);

                }
            }
            // console.log(gTmpGhosts)
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === POWERFOOD && !isSuper) {
        gPacman.isSuper = true;
        setTimeout(() => {

            // console.log(gTmpGhosts)
            for (var i = 0; i < gTmpGhosts.length; i++) {
                var g = gTmpGhosts.splice(i, 1)[0];
                i--;
                gGhosts.push(g);
                // console.log(gGhosts)
            }
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].colorNum = gTmpNums[i];
            }
            gTmpNums = []
            gPacman.isSuper = false;
        }, 5000);
    }

    if (gPacman.isSuper) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gTmpNums.length <= 3) gTmpNums.push(gGhosts[i].colorNum)
            gGhosts[i].colorNum = 4;
        }
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
    renderCell(gPacman.location, EMPTY)
        // moveDirection();
        // Move the pacman
        // update the model

    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the DOM

    renderCell(gPacman.location, PACMAN);
    moveDirection();
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    // debugger
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    gRotate = ev.code

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--

                break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }

    return nextLocation;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveDirection() {

    switch (gRotate) {
        case 'ArrowUp':
            document.querySelector('.pacman').classList.add('rotate-up');
            break;
        case 'ArrowDown':
            document.querySelector('.pacman').classList.add('rotate-down');
            break;
        case 'ArrowLeft':
            document.querySelector('.pacman').classList.add('rotate-left');
            break;
        case 'ArrowRight':
            document.querySelector('.pacman').classList.add('rotate-right');
            break;
    }
}