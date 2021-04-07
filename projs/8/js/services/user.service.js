'use strict'

var gCurrID = 101;
var STORAGE_KEY = 'usersDB';
var gSortType;
var gUsers;
_createUsers();

function doLogin(userNameInput, passwordInput) {
    return gUsers.find(function(user) {
        return user.userName === userNameInput && user.password === passwordInput;
    });

}


function _createUsers() {

    var users = loadFromStorage(STORAGE_KEY)
    if (!users || users.length === 0) {
        var users = [{
                id: getID(),
                userName: 'puki',
                password: 'secret',
                lastLoginTime: 1601891998864,
                isAdmin: false
            },
            {
                id: getID(),
                userName: 'shuki',
                password: 'secret1',
                lastLoginTime: 1601891998866,
                isAdmin: true
            },
            {
                id: getID(),
                userName: 'ruki',
                password: 'secret2',
                lastLoginTime: 1601891998865,
                isAdmin: false
            }
        ]
        for (var i = 0; i < 50; i++) {
            users.push(_createUser());
        }
    }
    gUsers = users;
    _saveUsersToStorage();
}

function _saveUsersToStorage() {
    saveToStorage(STORAGE_KEY, gUsers);
}

function removeUser(idX) {
    gUsers.splice(idX, 1)
    _saveUsersToStorage();
}

function getUsersForDisplay() {
    var users = gUsers;
    switch (gSortType) {
        case 'lastLogIn':

            users = users.sort(function(todo1, todo2) {
                return new Date(todo2.lastLoginTime) - new Date(todo1.lastLoginTime);
            });
            break;
        case 'username':
            users = users.sort(function(user1, user2) {
                var name1 = user1.userName.toLowerCase()
                var name2 = user2.userName.toLowerCase()
                if (name1 > name2) {
                    return 1;
                }
                if (name2 > name1) {
                    return -1;
                }
                return 0;
            });

            break;
    }
    return users;
}

function onSortTable(sortType) {
    gSortType = sortType;
    renderUserTable();
}



function _createUser() {
    return {
        id: getID(),
        userName: generateName(),
        password: '12345',
        lastLoginTime: 1601891998826 + getRandomIntInclusive(100, 1000000),
        isAdmin: false
    }
}