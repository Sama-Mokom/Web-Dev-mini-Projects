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
     saveData();
}

//listContainer.addEventListener('click', function(e){
//  if(e.target.tagName.toLowerCase() = "li" && e.target.tagName.toLowerCase() != "span"){
//    e.target.classList.toggle('checked');
//  saveData();
//    }
//     else if(e.target.tagName.toLowerCase() == "li"&& e.target.tagName == 'SPAN'){
//         e.target.parentElement.remove();
//         saveData();
//     }
//}, false);
function setTask(){
    
    const listItems = listContainer.querySelectorAll('li');
    listItems.forEach(item => {
        item.classList.toggle("checked");
    })
    saveData();
}



function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();




















