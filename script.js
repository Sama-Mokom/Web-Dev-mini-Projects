const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");
let tasks = [];

function generateUniqueID(){
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}
function renderTasks(){
    listContainer.innerHTML = '';

    if (tasks.length > 0){
        addButton.classList.add("full");
        inputBox.classList.remove("search-bar")
    } 
    else{
        addButton.classList.remove("full");
        inputBox.classList.add("search-bar")
    }
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task.itemText;
        li.dataset.id = task.id;

        if (task.isComplete){
            li.classList.add("checked");
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add('delete-icon')
        li.appendChild(span);

        listContainer.appendChild(li);
    });
    saveData();
}

function saveEditedTask(id, newText){
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex > -1){
        tasks[taskIndex].itemText = newText.trim();
        renderTasks();
    }
}

function addTask(){
    const taskText = inputBox.value.trim();
    if (taskText === ''){
        alert("You must enter a task before adding");
        return;
    }
    const newTask = {
        id: generateUniqueID(),
        itemText: taskText,
        isComplete: false,
    }
    tasks.push(newTask);
    inputBox.value = '';
    renderTasks();
}

function toggleTaskStatus(id){
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex > -1){
        tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
        renderTasks();
    }
}


function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(); 
}


inputBox.addEventListener("keydown", function(event){
   if (event.key === "Enter"){
      addTask();
   } 
})


addButton.addEventListener("click", function(){
    inputBox.classList.remove("search-bar");
    addButton.classList.add("full");
});

let clickTimer = null; //variable to store timer for distinguishing single click from double click
listContainer.addEventListener('click', function(e){
    const clickedElement = e.target;
    const listItem = clickedElement.closest('LI');
    console.log(listItem);

    if (!listItem) return;
    const taskID = parseInt(listItem.dataset.id);

    if (clickedElement.classList.contains('delete-icon')){
        if (clickTimer){
            clearTimeout(clickTimer);
            clickTimer = null;
        }
        clickTimer = setTimeout(() =>{
            const taskID = parseInt(listItem.dataset.id);
            deleteTask(taskID);
            clickTimer = null;
        }, 250);


    }
    else if(clickedElement.classList.contains('edit-button')){
        if (clickTimer){
            clearTimeout(clickTimer);
            clickTimer = null;
        }
        clickTimer = setTimeout(() =>{
            const originalText = listItem.firstChild.textContent.trim();
            listItem.innerHTML = '';

            const inputField = document.createElement('input');
                  inputField.type = 'text';
                  inputField.value = originalText;
                  inputField.classList.add('edit-input-field');
                  inputField.maxLength = 255;

            listItem.appendChild(inputField);
            inputField.focus();
            inputField.select();

            inputField.addEventListener('keydown', function(event){//Saves the task the user was editing when they press Enter
             if (event.key === "Enter"){
                const taskID = parseInt(listItem.dataset.id);
                saveEditedTask(taskID, inputField.value);
                listItem.classList.remove('editing-pending');
            }
          }, false);
            inputField.addEventListener('blur', function(){ //Saves the task the user was editing if they click away from the task
            const taskID = parseInt(listItem.dataset.id);
            saveEditedTask(taskID, inputField.value);
            listItem.classList.remove('editing-pending');
          });
            clickTimer = null;
        }, 250);
        

    }
    else if(clickedElement.tagName === "LI" && !listItem.classList.contains('editing-pending') && !listItem.classList.contains('editing-active')){ //Checks if the user has clicked on a task which is in the edit state, if ot then it checks or unchecks the task
        if (clickTimer){
            clearTimeout(clickTimer);
            clickTimer = null;
        }
        clickTimer = setTimeout(() =>{
            const taskID = parseInt(listItem.dataset.id);
            toggleTaskStatus(taskID);
            clickTimer = null;
        }, 250);
    }
}, false);


listContainer.addEventListener('dblclick', function(e){
    if (clickTimer){
        clearTimeout(clickTimer);
        clickTimer = null;
    }
    const clickedElement = e.target;
    const listItem = clickedElement.closest('li');
    // alert("Double Click Registered");

    if (!listItem || listItem.classList.contains('editing-pending')|| listItem.classList.contains('editing-active')) { //Checks if the user double clicked on a task that was already in the editing state
        return;
    }
    const taskID = parseInt(listItem.dataset.id);
    const deleteSpan = listItem.querySelector('.delete-icon');

    if (deleteSpan){
        deleteSpan.remove();
    }
    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('edit-button');
    listItem.appendChild(editButton);

    listItem.classList.add('editing-pending');
}, false);


function saveData(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showData(){
    const storeData = localStorage.getItem("tasks");
    if (storeData){
        tasks = JSON.parse(storeData);
    }
    renderTasks();
}
showData();

// if (tasks.length === 0){
//     addButton.classList.remove("full");
// }
// else{
//     addButton.classList.add("full");
// }


















