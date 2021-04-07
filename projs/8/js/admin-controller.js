var gIsChecked = false;

function init() {
    if (!loadFromStorage('currLoggedInUser') || !loadFromStorage('currLoggedInUser').isAdmin) location.replace('index.html')
    renderUserTable();
}

function renderUserTable() {
    var users = getUsersForDisplay();
    var strHTML = ''
    var idX = 0;
    var elUserCards = document.querySelector('.user-cards-container');
    var elUsersTable = document.querySelector('.users-table');
    if (!gIsChecked) {
        elUserCards.style.display = 'none';
        elUsersTable.style.display = 'inline-table';
        users.forEach(function(user) {
            strHTML += `<tr>
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td>${new Date(user.lastLoginTime).toString()}</td>
        <td>${user.isAdmin}</td>
        <td><button onclick="onRemoveUser(${idX})" class="remove-btn">X</button></td>
    </tr>`
            idX++;
        })


        var elTable = document.querySelector('.users-table tbody');
        elTable.innerHTML = strHTML
    } else {
        elUserCards.style.display = 'block';
        elUsersTable.style.display = 'none';
        strHTML
        users.forEach(function(user) {
            strHTML += `<div class="card">
            <img src="img/img_avatar2.png" alt="Avatar" style="width:100%">
                <h4><b>${user.userName}</b></h4>
                     <ul>
                    <li>Password:<br/> ${user.password}</li>
                    <li>Last Login Time:<br/> ${new Date(user.lastLoginTime).toString()}</li>
                   <li>Is Admin?<br/> ${user.isAdmin}</li>
                   </ul>
           <button onclick="onRemoveUser(${idX})" class="remove-btn">X</button>
      
        </div>`
            idX++;
        })
        elUserCards.innerHTML = strHTML;
    }

}

function onRemoveUser(idX) {
    removeUser(idX);
    renderUserTable();
}

function changeDisplay(elSwitch) {
    gIsChecked = elSwitch.checked;
    renderUserTable();
}