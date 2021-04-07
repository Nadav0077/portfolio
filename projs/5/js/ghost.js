'use strict'
var GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board) {
    // TODO
    var ghost = {
        location: {
            i: 2,
            j: 3
        },
        currCellContent: FOOD,
        colorNum: getRandomIntInclusive(1, 3)
    }
    gGhosts.push(ghost);
    // GHOST = getGhost(ghost.colorNum);
    board[ghost.location.i][ghost.location.j] = getGhost(ghost.colorNum);

}

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(moveGhosts, 500)
    console.log(gGhosts)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }


}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j

    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver();
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // debugger
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span>${getGhost(ghost.colorNum)}</span>`
}

function getGhost(num) {
    switch (num) {
        case 1:
            return `<div class="ghost pinky">
        <div class="eyes">
          <div class="eye leftEye"><div class="iris"></div></div>
          <div class="eye rightEye"><div class="iris"></div></div>
        </div>
        <div class="ghostTail"></div>
      </div>`;
        case 2:
            return `<div class="ghost inky">
      <div class="eyes">
        <div class="eye leftEye"><div class="iris"></div></div>
        <div class="eye rightEye"><div class="iris"></div></div>
      </div>
      <div class="ghostTail"></div>
    </div>`;
        case 3:
            return `<div class="ghost clyde">
    <div class="eyes">
      <div class="eye leftEye"><div class="iris"></div></div>
      <div class="eye rightEye"><div class="iris"></div></div>
    </div>
    <div class="ghostTail"></div>
  </div>`;
        case 4:
            return `<div class="ghost blinky">
  <div class="eyes">
    <div class="eye leftEye"><div class="iris"></div></div>
    <div class="eye rightEye"><div class="iris"></div></div>
  </div>
  <div class="ghostTail"></div>
</div>`;
    }
}