let allUsers = [];
let editingUserId = null;
window.addEventListener('load', ()=>{getUsers();});
async function getUsers() {
    try{
        let response = await fetch('/users');
        if(response.status === 401){
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        if(response.status === 400){
            alert(data.messsahe);
            return;
        }
        allUsers = data;
        displayUsers(data);
    } catch(err){
        console.error(err);
        alert('error loading users');
    }
}
function displayUsers(data){
    let txt = "";
    txt += `<tr>`;
    txt += `<th>ID</th>`;
    txt += `<th>Name</th>`;
    txt += `<th>Email</th>`;
    txt += `<th>Edit</th>`;
    txt += `<th>Delete</th>`;
    txt += `</tr>`;
    for (let user of data) {
        if (user) {
            txt += `<tr>`;
            txt += `<td>${user.id}</td>`;
            txt += `<td>${user.name}</td>`;
            txt += `<td>${user.email}</td>`;
            txt += `<td><button onclick="editUser(${user.id})">Edit</button></td>`;
            txt += `<td><button onclick="deleteUser(${user.id})">Delete</button></td>`;
            txt += `</tr>`;
        }
    }
    document.getElementById("usersTable").innerHTML = txt;
}