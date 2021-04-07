var gNums = [];
var gDifficult = 4;
var gCount = 0;
var gBestTime = Infinity;
var gTotalSeconds = 0;
var gInter;

function init() {
    renderBoard()
}

function renderBoard() {
    clearInterval(gInter)
    gCount = 0;
    resetNums();
    var strHtml = '';
    for (var i = 0; i < gDifficult; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gDifficult; j++) {
            strHtml += `<td
            onclick="cellClicked(this)"
            >${drawNum()}</td>`
        }

        strHtml += '</tr>'

    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml
}

function resetNums() {
    gNums = [];
    for (var i = 0; i < (gDifficult ** 2); i++) {
        gNums.push(i + 1);

    }
}

function drawNum() {
    var randIdx = getRandomInt(0, gNums.length);
    var randNum = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return randNum
}

function cellClicked(elCell) {
    if (gCount + 1 === 1) {
        gTotalSeconds = 0;
        gCount++;
        countTime();
    } else if (gCount === gDifficult ** 2) {
        document.querySelector('table').style.display = 'none'
        document.querySelector('img.win').style.display = 'block'
        document.querySelector('button.restart').style.display = 'block'

        if (gTotalSeconds < gBestTime) {
            gBestTime = gTotalSeconds;
            var minutesLabel = document.querySelector(".bestMinutes");
            var secondsLabel = document.querySelector(".bestSeconds");
            secondsLabel.innerText = pad(gTotalSeconds % 60);
            minutesLabel.innerText = pad(parseInt(gTotalSeconds / 60));
        };

        renderBoard();
    }
    if (parseInt(elCell.innerText) === gCount) {
        gCount++
        elCell.style.backgroundColor = "green"
    }
    console.log(gCount)
}

function countTime() {
    var minutesLabel = document.querySelector(".minutes");
    var secondsLabel = document.querySelector(".seconds");
    gTotalSeconds = 0;
    gInter = setInterval(setTime, 1000);


    function setTime() {
        ++gTotalSeconds;
        secondsLabel.innerText = pad(gTotalSeconds % 60);
        minutesLabel.innerText = pad(parseInt(gTotalSeconds / 60));
    }



}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function restartGame() {
    document.querySelector('img.win').style.display = 'none';
    document.querySelector('button.restart').style.display = 'none';
    document.querySelector('table').style.display = 'block';
}

function changeDifficult(num) {
    gDifficult = num;
    renderBoard();
}