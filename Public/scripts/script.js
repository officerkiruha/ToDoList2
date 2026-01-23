let greating = "Hello ";
greating+=localStorage.getItem('name');
document.getElementById('greating').innerHTML = greating; 
let allCategoris = [];
let allTasks = [];
let editingTaskId = null;

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
    let txt = "";
    for(obj of data){
        if(obj){ 
            let rowClass = obj.is_done ? "class = rowClass" : "";
            let isChecked = obj.is_done ? "checked" : "";
            let catName = '';
            if(allCategoris && allCategoris.length > 0){
                let cat = allCategoris.find(c => c.id === obj.category_id);
                catName = cat ? cat.name : '--';
            } else {
                catName = '--';
            }
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
        if(!response.ok){
         alert(data.message);   
        }
        getTasks();
    } catch(err) {
        alert(err);
    }
}

async function taskById(id) {
    editingTaskId = id;
    let task = allTasks.find(t => t.id == id);
    if (!task) return;
    
    document.getElementById('editTaskInput').value = task.text;
    let editCategorySelect = document.getElementById('editCategorySelect');
    editCategorySelect.innerHTML = '';
    allCategoris.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        if (category.id == task.category_id) option.selected = true;
        editCategorySelect.appendChild(option);
    });
    
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    editingTaskId = null;
}

async function saveEditTask() {
    try {
        let taskText = document.getElementById('editTaskInput').value.trim();
        let categoryId = document.getElementById('editCategorySelect').value;
        
        if (!taskText) {
            alert('Please enter task text');
            return;
        }
        
        let response = await fetch(`/tasks/${editingTaskId}`, {
            method: 'PATCH',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                text: taskText,
                category_id: parseInt(categoryId) || null
            })
        });
        
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        } else {
            closeEditModal();
            getTasks();
        }
    } catch(err) {
        alert(err);
    }
}

async function getCategories(){
    try{
        let response = await fetch('/categories');
        if(response.status == 401){
            window.location.href = '/login';
        }
        let data = await response.json();
        if(data.length === undefined){
            alert(data.message || 'Error loading categories');
            return;
        }
        allCategoris = data;
        SelectCat();
    }
    catch(err){
        alert(err)
    }
}

function SelectCat(){
    let select = document.getElementById('tasksSelect');
    select.innerHTML = '<option value="">View All Tasks</option>';
    let categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '';
    allCategoris.forEach(category =>{
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
        categorySelect.appendChild(option.cloneNode(true));
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

async function addTask() {
    try {
        let taskInput = document.getElementById('taskInput');
        let categorySelect = document.getElementById('categorySelect');
        let taskText = taskInput.value.trim();
        let categoryId = categorySelect.value;
        if(categoryId == 0 ){
            categoryId = null;
        }
        
        console.log('Adding task:', {taskText, categoryId});
        
        if (!taskText) {
            alert('add text for task');
            return;
        }
        
        let response = await fetch('/tasks', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                text: taskText,
                category_id: parseInt(categoryId) || null
            })
        });
        let data = await response.json();
        if(!response.ok){
         alert(data.message);   
        } else {
            taskInput.value = '';
            getTasks();
        }
    } catch(err) {
        alert(err);
    }
}

getCategories()
getTasks();