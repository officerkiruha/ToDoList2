const { json, response } = require("express");

let allCategories = [];
let editingCategoryId = null;
window.addEventListener('load',()=>{getAllCategories();});
async function getCategories() {
    try{
        let response = await fetch('/categories');
        if(response.status===401){
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        if(response.status===400){
            alert(data.message);
            return;
        }
        allCategories = data;
        displayCategories(data);
    }catch(err){
        console.error(err);
        alert('Error loading categories');
    }
}
function displayCategories(data){
    let txt = "";
    for(let category of data){
        if(category){
            txt +=`<tr>`;
            txt +=`<td>${category.name}</td>`;
            txt += `<td><button onclick="editCategory(${category.id})">Edit</button></td>`;
            txt += `<td><button onclick="deleteCategory(${category.id})">Delete</button></td>`;
            txt += "<tr>";
        }
 document.getElementById("categoriesTable").innerHTML =txt;
    }
}
async function addCategory(){
    let categoryName = document.getElementById('categoryInput').value;
    if(!categoryName){
        alert('Please enter a category name');
        return;
    }
    try{
        let response = await fetch('/categories',{
            method : 'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({name:categoryName})
        });
        let data = await response.json();
        if(response.status === 201){
            alert(data.message);
            document.getElementById('categoryInput').value='';
            getCategories();
        } else{
            alert(data.message);
        }
    } catch(err){
        console.error(err);
        alert('Error adding category');
    }
}
function editCategory(id){
    let category = allCategories.find(c => c.id === id);
    if(category){
        editingCategoryId = id;
        document.getElementById('editCategoryInput').value = category.name;
        document.getElementById('editModal').style.display = 'block';
    }
}

async function saveEditCategory() {
    let newName = document.getElementById('editCategoryInput').value;
    if(!newName){
        alert('Please enter a category name');
        return;
    }
    try{
        let response = await fetch(`/categories/${editingCategoryId}`,{
        method: 'PATCH',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({name:newName})
        });
        let data = await response.json();
        if(response.status===200){
            alert(data.message);
            closeEditModal();
            getCategories();
        }else{
            alert(data.message);
        }
    }catch(err){
        console.error(err);
        alert('Error updating category');
    }
}