// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    event.preventDefault(); // Preveting from Submitting

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); // Div with class name todo
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; // showing Input Values after adding
    // Save to local - do this last
    // Save to Local
    saveLocalTodos(todoInput.value);
  

    newTodo.classList.add('todo-item'); // Div with an li of todo-item
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    // Check Mark Button tick wala
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-Btn");  // Class add ho gyi complete-Btn naam se
    todoDiv.appendChild(completedButton);


    // Delete krne wala button
    // Check trash button  - For adding a class element of trashButton in HTML using Javascript
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-Btn");
    todoDiv.appendChild(trashButton);

    // Append to List
    todoList.appendChild(todoDiv);
    // Clear To-do Input values
    todoInput.value = " ";
}

function deleteCheck(event) {
    // Grabbing the item jisko delete krna hai
    const item = event.target;
    // Delete ToDO
    if (item.classList[0] === "trash-Btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall"); // adding animation using css in fall class
        removeLocalStorageTodos(todo);
        todo.addEventListener("transitionend", function () {
            // Transition finish hone ke baad he function execute krna hai
            todo.remove(); // Transition hone he baad wo remove hoga space bhi hatt jaegi
        });

    }

    // Check Mark
    if (item.classList[0] === "complete-Btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")  // The toggle() method toggles between hide() and show() for the selected elements. This method checks the selected elements for visibility.
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    // Each individual todo ka access aa jaaega
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                // to Show all the todos jo ki pehle he show hoga toh isme reak laga do
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// Implementing the local storage of our data input
function saveLocalTodos(todo) {
    // Check -> Hey Do I have alredy things in there
    let todos;
    if (localStorage.getItem('todos') === null) {
    // .getItem() allows you to access the data stored in the browser's localStorage object
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo); // todo array ke andr pass krna jo todos se milega 
    localStorage.setItem('todos', JSON.stringify(todos));
    // local storage mai dalne ke baad usko string mai convert krenge 
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo"); // Div with class name todo
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; // showing Input Values after adding
  
        newTodo.classList.add('todo-item'); // Div with an li of todo-item
        todoDiv.appendChild(newTodo);
        

        // Check Mark Button tick wala
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class ="fas fa-check"></i>';
        completedButton.classList.add("complete-Btn");  // Class add ho gyi complete-Btn naam se
        todoDiv.appendChild(completedButton);


        // Delete krne wala button
        // Check trash button  - For adding a class element of trashButton in HTML using Javascript
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add("trash-Btn");
        todoDiv.appendChild(trashButton);

        // Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeLocalStorageTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    
    localStorage.setItem("todos", JSON.stringify(todos));
     //         (from what position to remove, how many to remove);
}
localStorage.clear();