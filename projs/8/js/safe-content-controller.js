'use strict'

function onLogin() {
    var userNameInput = document.querySelector('input[name=userNameInput]').value;
    var passwordInput = document.querySelector('input[name=passwordInput]').value;

    if (!userNameInput || !passwordInput) {
        alert('Please enter Username and Password!')
        return;
    }
    var currUser = doLogin(userNameInput, passwordInput);

    if (!currUser) {
        alert('Incorrect username or password!')
        return;
    }
    localStorage.removeItem('currLoggedInUser')
    currUser.lastLoginTime = Date.now();
    saveToStorage('currLoggedInUser', currUser)
    var loginSection = document.querySelector('.login-section');
    var insideSection = document.querySelector('.inside-section');
    loginSection.style.display = 'none';
    insideSection.style.display = 'flex';
    if (currUser.isAdmin) {
        document.querySelector('.admin-btn').style.display = 'block'
    }

}

function onLogout() {
    document.querySelector('.admin-btn').style.display = 'none'
    document.querySelector('.login-section').style.display = 'flex';
    document.querySelector('.inside-section').style.display = 'none';
    localStorage.removeItem('currLoggedInUser')
}

function onAdminPage() {
    location.replace('admin.html')
}