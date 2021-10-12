const inputTask = document.querySelector('#input-task');
const btnTask = document.querySelector('#btn-task');
const task = document.querySelector('#task');


function createLi(){
    const li = document.createElement('li');
    li.setAttribute('class', 'mb-1');
    return li;
}

inputTask.addEventListener('keypress', function (event){
    if(event.keyCode === 13) {
        if(!inputTask.value) return;   
        createTask(inputTask.value);
    }   
});

function clearInput(){
    inputTask.value = '';
    inputTask.focus();
}

function createBtnClear(li){
    li.innerText += ' ';
    const btnClear = document.createElement('button');
    btnClear.innerText = 'Apagar';
    btnClear.setAttribute('class', 'apagar btn btn-danger btn-sm');
    li.appendChild(btnClear);
}

function createTask(taskInput){
    const li = createLi();
    // li.insertAdjacentElement('beforeend', task);
    li.innerHTML = taskInput;
    task.appendChild(li);
    clearInput();
    createBtnClear(li);
    saveTasks();
}
 

btnTask.addEventListener('click', function (event){
    if(!inputTask.value) return;   
    createTask(inputTask.value);
});

document.addEventListener('click', function(event){
    const el = event.target;
    
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        saveTasks();
    }
})

function saveTasks(){
    const liTask = task.querySelectorAll('li');
    const ListTask = [];

    for(let task of liTask){
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        ListTask.push(taskText);
    }

    const taskJSON = JSON.stringify(ListTask);
    localStorage.setItem('tarefas', taskJSON);
}

function addTasksSaves(){
    const tasks = localStorage.getItem('tarefas');
    const ListTasks = JSON.parse(tasks);

    for(let task of ListTasks){
        createTask(task);
    }

    console.log(ListTasks);
}

addTasksSaves();