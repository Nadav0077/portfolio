'use strict';

var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
    console.log('Started...');
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show(400);
}

function renderQuest() {
    _setText('.quest h1', getCurrQuest().txt)
}

function onUserResponse(ev) {
    var res = ev.data.ans;
    if (isChildless(getCurrQuest())) {
        $('header').collapse('show')
        if (res === 'yes') {
            $('.logo').attr('src', 'img/layout/win.gif')
            $('header h1').text('I always win!')
            $('.quest').hide();
            onRestartGame();
        } else {
            $('.logo').attr('src', 'img/layout/lose.gif')
            $('header h1').text('That\'s not possible!')
            $('.quest').hide();
            $('.new-quest').show();
            gLastRes = getCurrQuest();
            // TODO: hide and show new-quest section
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = getCurrQuest();
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();

    // TODO: Get the inputs' values

    // TODO: Call the service addGuess
    addGuess(newQuest, newGuess, gLastRes)

    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    restartQuestTree();
    gLastRes = null;
}

function _setText(el, txt) {
    $(el).hide(0, function() {
        $(this).html(txt).show(400);
    });
}