'use strict';

var STORAGE_KEY = 'todosDB';
var gFilterBy = 'all';
var gTodos;
var gSortBy = 'created';
_createTodos();

function getTodosForDisplay() {
    var todos = gTodos;
    if (gFilterBy !== 'all') {
        todos = gTodos.filter(function(todo) {
            return todo.isDone && gFilterBy === 'done' ||
                !todo.isDone && gFilterBy === 'active'

        })
    }
    switch (gSortBy) {
        case 'created':
            todos = todos.sort(function(todo1, todo2) {
                return todo2.createdAt - todo1.createdAt;
            });
            break;
        case 'txt':
            todos = todos.sort(function(todo1, todo2) {
                if (todo1.txt > todo2.txt) {
                    return -1;
                }
                if (todo2.txt > todo1.txt) {
                    return 1;
                }
                return 0;
            });
            todos.reverse();
            break;
        case 'importance':
            todos = todos.sort(function(todo1, todo2) {
                return todo2.importance - todo1.importance;
            });
            break;
    }
    return todos;
}

function getTotalCount() {
    return gTodos.length;
}

function getActiveCount() {
    var todos = gTodos.filter(function(todo) {
        return !todo.isDone;
    })
    return todos.length;
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function(todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt) {
    var todo = _createTodo(txt);
    gTodos.unshift(todo);
    _saveTodosToStorage();
}


function setFilter(filterBy) {
    gFilterBy = filterBy
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    if (!todos || todos.length === 0) {
        var todos = [
            _createTodo('Study HTML'),
            _createTodo('Learn CSS'),
            _createTodo('Master Javascript')
        ];
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance = 1) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
    return todo;
}


function setSort(sortBy) {
    gSortBy = sortBy;
}