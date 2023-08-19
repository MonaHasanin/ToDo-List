
function refresh(){
    window.location.reload("Refresh")
  }

  

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
 
//Empty Array To Store The Tasks
let arrayOfTasks = [];

//Check if there is tasks in local storage
if(localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

    //Trigger Get Data from Local Storage Function
    getDataFromLocalStorage();

// Add Task 
submit.onclick = function () {
    if (input.value == "") {
        alert("You have to write some thing, thanks:)")
    }
    else {
        addTaskToArray(input.value); //Add Task to Array of Tasks
        input.value = ""; //Empty Input Field
    }
};

//click on task element
tasksDiv.addEventListener("click", (e) => {
    //Delete Button
    if (e.target.classList.contains("del")) {
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

        //Remove Element From Page
        e.target.parentElement.remove();

    }
    //task element
    if (e.target.classList.contains("task")) {
        //toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //toggle done class
        e.target.classList.toggle("done");
    }
 
});



function addTaskToArray(taskText) {
    //Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //push Task to Array Of rasks
    arrayOfTasks.push(task);

//Add Tasks to page
addElementsToPageFrom(arrayOfTasks);
// Add Tasks To Local Storage
addDataToLocalStorageFrom(arrayOfTasks);
//For Testing
//console.log(arrayOfTasks);
//console.log(JSON.stringify(arrayOfTasks));
}
function addElementsToPageFrom(arrayOfTasks) {
    //Empty Tasks Div
    tasksDiv.innerHtml = "";

    //looping on array of tasks
    arrayOfTasks.forEach((task) => {

        //create main Div
        let div = document.createElement("div");
        div.className = "task";
        
        //check if task is done
      if (task.completed) {
         div.className = "task done";
        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
       // console.log(div);

       //create delete button
       let span = document.createElement("span");
       span.className = "del";
       span.appendChild(document.createTextNode("Delete"));
       //Append button to main div
       div.appendChild(span);
        //console.log(div);

        //add task div to container
        tasksDiv.appendChild(div);
    });
}


function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
  
  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementsToPageFrom(tasks);
    }
  }
  
  function deleteTaskWith(taskId) {
    //for Explain only
  //  for(let i = 0; i < arrayOfTasks.length; i++) {
    //    console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    //}

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
  }
  
  function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
  }


