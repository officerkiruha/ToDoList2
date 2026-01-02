let greating = "Hello";
greating+=localStorage.getItem('name');
document.getElementById('greating').innerHTML = greating; 
allCategoris =[];
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
        createTable(data)
    }
    catch{
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
    }
    catch{
        alert(err)
    }
}
function SelectCat(){
    let select = document.getElementById('tasksSelect');
    select.innerHTML = '<option value="">Chose Category</option>';
    allCategoris.forEach(category =>{
           const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    })
}
getCategories()
getTasks();