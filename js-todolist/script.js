const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

let tasks = [];

function renderTasks(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if(task.completed) li.classList.add('completed');

    li.addEventListener('click',() => {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTasks();
    })

    const delBtn = document.createElement('button');
    delBtn.innerText = 'delete';
    delBtn.style.marginLeft = '10px';
    delBtn.style.border = '1px solid black';

    delBtn.addEventListener('click',function(event) {
        event.stopPropagation();
        const index = tasks.indexOf(task);
        if (index > -1) tasks.splice(index,1);
        li.remove();
        saveTasks();
    })

    li.appendChild(delBtn);
    list.appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => renderTasks(task));
    }
}

loadTasks();

addBtn.addEventListener('click', ()=>{
    const text = input.value.trim();
    if(!text) return;

    const task = {text, completed:false};
    tasks.push(task);
    renderTasks(task);
    saveTasks();
    input.value = '';
})

