const appHeader = document.querySelector('.app-header')
const appMain = document.querySelector('.app-main')
const appFooter = document.querySelector('app-footer')
const btnOpenModal = document.querySelector('.btn#add_new-task')
const taskLinks = document.querySelectorAll('.app-main .tasks ul li')
const modal = document.querySelector('.task-modal')
const btnAddTask = document.querySelector('.task-modal .btn-m')
const tasksContainerList = document.querySelectorAll('.tasks-container .task-content')

function openModal() {
    const inputTaskName = document.querySelector('.new_task-name')
    const inputTaskDesc = document.querySelector('.new_task-description')
    const inputTaskPriority = document.querySelector('.new_task-priotity')
    const btnOptions = document.querySelectorAll('.btn-options .btn')
    const btnCloseModal = document.querySelector('.btn-close')
    
    modal.classList.remove('disable') 
    appHeader.classList.add('opacity')
    appMain.style.maxHeight="300px"

    inputTaskName.value = ''
    inputTaskDesc.value = ''
    inputTaskPriority.checked = false

    alternateClickable(btnOptions, 'btn-active')
    btnCloseModal.addEventListener('click', closeModal)

    // Add New Task 
    btnAddTask.addEventListener('click', (event)=>{
        // event.preventDefault()
        addTask(inputTaskName.value, inputTaskDesc.value, 0, inputTaskPriority.checked)
    })


}

function alternateClickable(btnArr, className, displayElements = false, elementsClassName = false) {
    btnArr.forEach((btn, i, arr) => {
        btn.addEventListener('click', ()=> {
            arr.forEach(btn=>btn.classList.remove(className))
            btn.classList.add(className)
            if (displayElements) {
                displayElements.forEach(element=>{
                    element.classList.add(elementsClassName)
                })
                displayElements[i].classList.remove(elementsClassName)
            }
        })
    })
}

function closeModal() {
    modal.classList.add('disable') 
    appHeader.classList.remove('opacity')
    appMain.style.maxHeight="100%"
}

alternateClickable(taskLinks, 'active', tasksContainerList, 'disable')
btnOpenModal.addEventListener('click', openModal)

// localStorage Operations
class Task {
    id
    name
    desc
    days
    prior
    constructor(id, name, desc, days, prior) {
        this.id = id
        this.name = name
        this.desc = desc
        this.days = days
        this.prior = prior
    }
}

const allTasks = () => JSON.parse(localStorage.getItem('tasks')) || []
const doneTasks = () =>  JSON.parse(localStorage.getItem('done_tasks')) || []

const addTask = (name, desc, days = [] || 0, prior = false) => {
    const existingItems = allTasks()
    const newId = allTasks().length > 0 ? allTasks()[allTasks().length - 1].id + 1 : 0
    const newTask = new Task(newId, name, desc, days, prior)
    existingItems.push(newTask)
    return localStorage.setItem('tasks', JSON.stringify(existingItems))
}

function displayTasks(filter = 'all') {
    const sectionAllTasks = tasksContainerList[0].childNodes[1]
    const existingItems = allTasks()

    if(!existingItems) {
        return sectionAllTasks.innerHTML = '<h3>Nenhum item para mostrar</h3>'
    }

    existingItems.map(task => sectionAllTasks.innerHTML+=`
        <li draggable='true' class="task-card" onclick="finishTask(${task.id})">
            <div class="left">
                <h3>${task.name}</h3>
                <p>${task.days === 0 ? 'Today' : 'MODIFICAR ISSO MAIS TARDE EX: mon, tue, wed, ...'}</p> 
            </div>
            <div class="right"></div>
        </li>
    
    `)
} 

function finishTask(taskId) {
    const taskIndex = allTasks().findIndex(item=>item.id === taskId)
    const existingItems = allTasks()
    const task = existingItems[taskIndex]
    const existingDoneTasks = doneTasks()
    existingDoneTasks.push(task)
    existingItems.splice(taskIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(existingItems))
    localStorage.setItem('done_tasks', JSON.stringify(existingDoneTasks))
    return location.reload() // Método provisório
}

displayTasks()

console.log(allTasks())


console.log(doneTasks())