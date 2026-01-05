let greating = "Hello";
greating+=localStorage.getItem('name');
document.getElementById('greating').innerHTML = greating; 
let allCategoris = [];
let allTasks = [];

async function getTasks(){
    try{
        let response = await fetch('/tasks');
        if(response.status == 401){
            window.location.href = '/login';
        }
        let data = await response.json();
        if(response.status == 400){
            alert(data.message);
            return;
        }
        allTasks = data;
        createTable(data)
    }
    catch(err){
        alert(err)
    }
}

function createTable(data){
    console.log("kkkk");
    
    let txt = "";
    for(obj of data){
        if(obj){ 
            let rowClass = obj.is_done ? "class = rowClass" : "";
            let isChecked = obj.is_done ? "checked" : "";
            let catName = allCategoris[obj.category_id] ? allCategoris[obj.category_id].name:'--';
            txt +=`<tr class = ${rowClass} >`;
            txt += `<td><input type="checkbox" ${isChecked} onchange="taskDone(${obj.id},this)"></td>`;
            txt += `<td>${obj.text}</td>`;
            txt += `<td>${catName}</td>`;
            txt += `<td><button onclick = "taskById(${obj.id})">Edit</button></td>`;
            txt += `<td><button onclick="deleteTask(${obj.id})">Delete</button></td>`;
            txt += "</tr>";
        }            
    }
    document.getElementById("taskTabel").innerHTML=txt
}

async function taskDone(id, elm) {
    let isDone = elm.checked;
    try {
        let response = await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({isDone})
        });
        getTasks();
    } catch(err) {
        alert(err);
    }
}

async function deleteTask(id) {
    try {
        let response = await fetch(`/tasks/${id}`, {
            method: 'DELETE',
            headers: {'Content-type':'application/json'}
        });
        let data = await response.json();
        alert(data.message);
        getTasks();
    } catch(err) {
        alert(err);
    }
}

async function taskById(id) {
    alert("Edit functionality coming soon for task " + id);
}

async function getCategories(){
    try{
        let response = await fetch('/categories');
        if(response.status == 401){
            window.location.href = '/login';
        }
        let data = await response.json();
        if(response.status == 400){
            alert(data.message);
            return;
        }
        for(let c of data){
            allCategoris[c.id] = c;
        }
        SelectCat();
    }
    catch(err){
        alert(err)
    }
}

function SelectCat(){
    let select = document.getElementById('tasksSelect');
    select.innerHTML = '<option value="">View All Tasks</option>';
    allCategoris.forEach(category =>{
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    })
    select.addEventListener('change', filterTasks);
}

function filterTasks() {
    let select = document.getElementById('tasksSelect');
    let selectedCategoryId = select.value;
    
    if (selectedCategoryId === '') {
        createTable(allTasks);
    } else {
        let filteredTasks = allTasks.filter(task => task.category_id == selectedCategoryId);
        createTable(filteredTasks);
    }
}

getCategories()
getTasks();