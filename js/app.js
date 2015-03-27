
// Todo List in pure JS

/* VARIABLES:
))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*/

var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

/* FUNCTIONS:
))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*/

// New Task List Item
var createNewTaskElement = function(taskString) {
  // Create List Item
  var listItem = document.createElement("li");

    // CREATE elements:
    // input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    // label
    var label = document.createElement("label");
    // input (text)
    var editInput = document.createElement("input"); // text
    // button.edit
    var editButton = document.createElement("button");
    // button.delete
    var deleteButton = document.createElement("button");

    // Each element needs modifying
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    // Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Add a new task
var addTask = function() { // event handler
  console.log("Add task...");

  // if no text exists warn user
  var taskValue = taskInput.value;
  if(!taskValue) {
    taskInput.classList.add("warning");
  } else {
    // create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    // Append list item to incompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  }

  taskInput.value = "";
}

// edit existing task
var editTask = function () { // event handler
  console.log("Edit task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
    // if the class of the parent is .editMode
    if(containsClass) {
      // switch from .editMode
      // label text become the input's value
      label.innerText = editInput.value
      editButton.innerText = "Edit";
    } else {
      // Switch to .editMode
      // input value becomes the labels text
      editInput.value = label.innerText;
      editButton.innerText = "Save";
    }

    // Toggle .editMode on the list item
    listItem.classList.toggle("editMode");
}

// Delete an existing task
var deleteTask = function () { // event handler
  console.log("Delete task...");
  var listItem = this.parentNode; // this = button, parentNode = <li>
  var ul = listItem.parentNode; // ul = 

  // remove the parent list item from the ul
  ul.removeChild(listItem);
}

// mark task completed
var taskCompleted = function () { // event handler
  console.log("task complete...");
  // append the task list item to the #completed-tasks
  var listItem = this.parentNode; // create clear code!
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// mark task as incomplete
var taskIncomplete = function () {
  console.log("task incomplete...");
  // Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  console.log(listItem);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


/* WIRING HERE:
))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*/

// DRY code - best practice
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");

    // select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit"); // use CSS selectors, instead of "byClassName..."
    var deleteButton = taskListItem.querySelector("button.delete");

    // bind editTask to edit button
    editButton.onclick = editTask;

    // bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    // bind taskCompleted to checkbox
    checkBox.onchange = checkBoxEventHandler; // use "onchange" due to tab/spacebar to select OR click

}


  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    IN-PROGRESS: Stubbing out AJAX call to pull todo list from API/JSON
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  // Browser support: IE9+

  // The REQUEST
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', 'data/todo.json');
  ajaxRequest.send(); // null or search=webdev

  // The RESPONSE
  ajaxRequest.onload = function() {
    if(ajaxRequest.status === 200) {
      // code to process results from server
      console.log(ajaxRequest.responseText)
    }
  }

  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// cycle over incompleteTaskHolder ul list items
// "i" is short for INDEX
for(var i=0; i < incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// cycle over completeTaskHolder ul list items
for(var i=0; i < completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

