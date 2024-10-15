// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');


document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `${taskText} <button class="delete-button">Delete</button>`;
    
    // Add delete functionality
    taskItem.querySelector('.delete-button').addEventListener('click', deleteTask);
    
    // Mark task as completed on click
    taskItem.addEventListener('click', function() {
        this.classList.toggle('completed');
        saveTasks();
    });

    // Append to the task list
    taskList.appendChild(taskItem);
    
    // Save to local storage
    saveTasks();

    // Clear input field
    taskInput.value = '';
}

// Delete task function
function deleteTask(e) {
    e.stopPropagation();
    this.parentElement.remove();
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(task => {
        tasks.push({
            text: task.textContent.replace('Delete', '').trim(),
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `${task.text} <button class="delete-button">Delete</button>`;
        
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.querySelector('.delete-button').addEventListener('click', deleteTask);
        
        taskItem.addEventListener('click', function() {
            this.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(taskItem);
    });
}
