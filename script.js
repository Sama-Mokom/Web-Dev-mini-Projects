const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");
let count = listContainer.childElementCount;

function addTask(){
     if(inputBox.value === ''){
        alert("You must enter a task before adding");
     }
     else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        console.log(listContainer.childElementCount);
        if(listContainer.childElementCount !=0 ){
             addButton.classList.add("full");
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
     }
     inputBox.value = '';
     saveData();
}
inputBox.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        addTask();
    }
});
addButton.addEventListener("click", function(e){
    console.log(count);
    inputBox.classList.remove("search-bar");
})

listContainer.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() == "li" && e.target.tagName.toLowerCase() != "span"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);
 if(listContainer.childElementCount === 0){
            addButton.classList.remove("full");
        }
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();




















