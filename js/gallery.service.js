'use strict'

var gProjs = [{
        "id": "minesweeper",
        "name": "Minesweeper",
        "title": "This is the first sprint!!",
        "desc": "This is the first sprint!",
        "url": "projs/1/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Games"
    }, {
        "id": "in-picture-Game",
        "name": "In-Picture Game",
        "title": "What's in the picture?",
        "desc": "What's in the picture?",
        "url": "projs/2/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Games"
    }, {
        "id": "touch-Nums",
        "name": "Touch Nums",
        "title": "You must think fast to win this game",
        "desc": "This is a simple but fun game!",
        "url": "projs/3/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Games"
    }, {
        "id": "ball-Board",
        "name": "Ball Board",
        "title": "This is fun one",
        "desc": "Can you catch all of the balls?",
        "url": "projs/4/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Games"
    }, {
        "id": "pacman",
        "name": "Pacman",
        "title": "Just Pacman",
        "desc": "One of the best games ever!",
        "url": "projs/5/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Games"
    }, {
        "id": "todos",
        "name": "Todos",
        "title": "Better finish those tasks",
        "desc": "This app will help you finish your tasks fast!",
        "url": "projs/6/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Tasks"
    }, {
        "id": "booksShop",
        "name": "Books Shop",
        "title": "let's manage a Books Shop!",
        "desc": "Let me help you manage your shop!",
        "url": "projs/7/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Shops"
    }, {
        "id": "safeConect",
        "name": "Safe Conect",
        "title": "let's manage some users!",
        "desc": "If you want to manage your users, this is the way!",
        "url": "projs/8/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Managing"
    },
    {
        "id": "guessMe",
        "name": "Guess Me!",
        "title": "let's guess some names!",
        "desc": "A self learning guessing game.",
        "url": "projs/9/index.html",
        "publishedAt": new Date("04/07/2021").getTime(),
        "labels": ["Matrixes", "keyboard events"],
        "client": "CA",
        "category": "Managing"
    }

]

function getProjs() {
    return gProjs;
}

function getMonth(publishDate) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    var n = month[d.getMonth()];
    document.getElementById("demo").innerHTML = n;
}

function getDate(dateMillisec) {
    return new Intl.DateTimeFormat(['ban', 'id']).format(new Date(dateMillisec))
}

console.log(Date.now())