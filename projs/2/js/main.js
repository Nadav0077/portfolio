'use strict';
var gQuests = [
    { id: 1, opts: ['Dog', 'Cat', 'Whale'], correctOptIndex: 1 },
    { id: 2, opts: ['Bird', 'Human', 'Cat'], correctOptIndex: 3 },
    { id: 3, opts: ['Lion', 'Giraffe', 'Elephent'], correctOptIndex: 2 },
    { id: 4, opts: ['Sea Turtle', 'Nemo', 'Shark'], correctOptIndex: 1 }
]

var gCurrQuestIdx = 0;

function init() {
    renderGame();
}

function renderGame() {
    var strHtml = '';
    strHtml += `<tr><td colspan = "3"><img src="img/${gCurrQuestIdx+1}.png"</td></tr>`
    strHtml += '<tr>'
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {

        strHtml += `<td><button class="button" onclick="checkAnswer(${i+1},this)"><span>${gQuests[gCurrQuestIdx].opts[i]}</span></button></td>`

    }
    strHtml += '</tr>'

    var elBoard = document.querySelector('.answers');
    elBoard.innerHTML = strHtml
}

function checkAnswer(answerIdx, elBtn) {

    if (gQuests[gCurrQuestIdx].correctOptIndex === answerIdx) {
        if (gCurrQuestIdx + 1 === gQuests.length) {
            var elTable = document.querySelector('table');
            elTable.style.display = 'none'
            document.querySelector('img.win').style.display = 'block'
            document.querySelector('button.restart').style.display = 'block'
            gCurrQuestIdx = 0;
        } else gCurrQuestIdx++;
        renderGame();
    } else {
        elBtn.style.backgroundColor = "red"
    }
}

function restartGame() {
    document.querySelector('img.win').style.display = 'none';
    document.querySelector('button.restart').style.display = 'none';
    document.querySelector('table').style.display = 'block';
}