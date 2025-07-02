let title = document.getElementById('Title');
let nameField = document.getElementById('nameField');
let signUpBtn = document.getElementById('SignUpBtn');
let signInBtn = document.getElementById('SignInBtn');
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


 signInBtn.onclick = function(){
     nameField.style.maxHeight = 0;
     title.innerHTML = "Sign In";
    signInBtn.classList.add("disable");
    signUpBtn.classList.remove("disable");
 }

 signUpBtn.onclick = function(){
     title.innerHTML = "Sign Up";
     signUpBtn.classList.add("disable");
     signInBtn.classList.remove("disable");
     nameField.style.maxHeight = '65px';
 }



function addTask(){
     if(inputBox.value === ''){
        alert("You must enter a task before adding");
     }
     else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
     }
     inputBox.value = '';
     saveTask();
}

inputBox.addEventListener("keydown", function(e){
    if(e.key === 'Enter') {
        addTask();
    }
});


listContainer.addEventListener("click", function(e){
    if(e.target.tagName.toLowerCase() === "li"){
        e.target.classList.toggle("checked");
        saveTask();
    }
    else if(e.target.tagName.toLowerCase() === "span"){
        e.target.parentElement.remove();
        saveTask();
    }
}, false);



function saveTask(){
    localStorage.setItem("task", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("task");
}
showTask();




















