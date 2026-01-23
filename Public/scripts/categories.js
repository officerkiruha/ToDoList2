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
