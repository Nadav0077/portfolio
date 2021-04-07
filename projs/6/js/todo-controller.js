'use strict';

function onInit() {
    renderTodos();
}


function renderTodos() {
    var todos = getTodosForDisplay();

    var strHTMLs = todos.map(function(todo) {
        var className = (todo.isDone) ? 'done' : ''
        return `  
        <li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button class="btn-remove" onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`;
    })
    var elTodoList = document.querySelector('.todo-list ul')
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.stat-total').innerText = getTotalCount();
    document.querySelector('.stat-active').innerText = getActiveCount();
    if (!todos.length) {
        renderNoValuesDisplay();
        return;
    }
    document.querySelector('.no-values-display').style.display = 'none';
}

function renderNoValuesDisplay() {
    document.querySelector('.no-values-display').style.display = 'block';
    var elNothingToDisplay = document.querySelector('.no-values-display');
    switch (gFilterBy) {
        case 'all':
            elNothingToDisplay.innerText = 'No todos at all!'
            break;
        case 'active':
            elNothingToDisplay.innerText = 'No active todos!'
            break;
        case 'done':
            elNothingToDisplay.innerText = 'No done todos!'
    }
}

function onRemoveTodo(ev, todoId) {
    var isSure = confirm('Are you sure that you want to delete this task?')
    if (isSure) {
        ev.stopPropagation();
        console.log('Removing', todoId);
        removeTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();

}

function onAddTodo() {
    var elTxt = document.querySelector('input[name=newTodoTxt]');
    var txt = elTxt.value;
    var importance = document.querySelector('select[name]').value
    if (txt) {
        addTodo(txt, importance);
        elTxt.value = '';
        renderTodos();
    }
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    console.log('Filtering', filterBy);
    renderTodos();
}



function onSetSort(sortBy) {
    setSort(sortBy);
    renderTodos();
}