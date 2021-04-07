var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const KEY = 'questsTreeDB'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    _saveQuestsTreeToStorage();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
    console.log(gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    debugger
    var res = (lastRes === gPrevQuest.yes) ? 'yes' : 'no'
    gPrevQuest[res] = createQuest(newQuestTxt)
    gPrevQuest[res].yes = createQuest(newGuessTxt)
    gPrevQuest[res].no = lastRes;
    console.log(gCurrQuest)
    _saveQuestsTreeToStorage();
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveQuestsTreeToStorage() {
    saveToStorage(KEY, gQuestsTree)
}

function restartQuestTree() {
    gCurrQuest = gQuestsTree;
}