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
function editUser(id){
    let user = allUsers.find(u=> u.id===id);
    if(user){
        editingUserId = id;
        document.getElementById('editUserName').value = user.name;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editModal').style.display = 'block';
    }
}
async function saveEditUser() {
    let name = document.getElementById('editUserName').value.trim();
    let email = document.getElementById('editUserEmail').value.trim();

    if(!name || !email){
        alert('Please fill in all fields');
        return;
    }
    try{
        let response = await fetch(`/users/${editingUserId}`,{
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });
        let data = await response.json();
        if(response.status === 200){
            alert(data.message);
            closeEditModal();
            getUsers();
        } else{
            alert(data.message)
        }
    }catch(err){
        console.error(err);
        alert('Error updating user');
    }    
}
function closeEditModal(){
    document.getElementById('editModal').style.display='none';
    editingUserId = null;
}

async function deleteUser(id) {
    let confirmation = confirm('Are you sure you want to delete this user?');
    if(!confirmation) return;
    try{
        let response = await fetch(`/users/${id}`,{
            method: 'DELETE'
        });
        let data = await response.json();
        if(response.status === 200){
            alert(data.message);
            getUsers();
        }else{
            alert(data.message);
        }
    }catch(err){
        console.error(err);
        alert('Error deleting user');
    }
}