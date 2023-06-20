'use strict'

const appHeader = document.querySelector('.app-header')
const appMain = document.querySelector('.app-main')
const appFooter = document.querySelector('app-footer')
const btnOpenModal = document.querySelector('.btn#add_new-task')
const taskLinks = document.querySelectorAll('.app-main .tasks ul li')
const modal = document.querySelector('.task-modal')
const btnAddTask = document.querySelector('.task-modal .btn-m')
const tasksContainerList = document.querySelectorAll('.tasks-container .task-content')
const msgContainer = document.querySelector('.msg-container')
const allTasks = () => JSON.parse(localStorage.getItem('tasks')) || []
const doneTasks = () =>  JSON.parse(localStorage.getItem('done_tasks')) || []

function openModal() {
    const inputTaskName = document.querySelector('.new_task-name')
    const inputTaskDesc = document.querySelector('.new_task-description')
    const inputTaskPriority = document.querySelector('.new_task-priotity')
    const btnOptions = document.querySelectorAll('.btn-options .btn')
    const btnCloseModal = document.querySelector('.btn-close')

    modal.classList.remove('disable') 
    appHeader.classList.add('opacity')
    appMain.style.maxHeight='300px'

    inputTaskName.value = ''
    inputTaskDesc.value = ''
    inputTaskPriority.checked = false

    btnOptions.forEach(btn=>btn.classList.remove('btn-active'))
    btnOptions[0].classList.add('btn-active')

    alternateClickable(btnOptions, 'btn-active')

    btnCloseModal.addEventListener('click', closeModal)

    // Add New Task 
    btnAddTask.addEventListener('click', (event)=>{
        event.preventDefault()
        addTask(inputTaskName.value, inputTaskDesc.value, 0, inputTaskPriority.checked)
    })
}

function alternateClickable(btnArr, className, displayElements = false, elementsClassName = false) {
    btnArr.forEach((btn, i, arr) => {
        btn.addEventListener('click', ()=> {
            arr.forEach(btn => btn.classList.remove(className))
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
    appMain.style.maxHeight='100%'
}

// localStorage Operations
const addTask = (name, desc, days = [] || 0, prior = false) => {
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

    const existingItems = allTasks()
    const newId = allTasks().length > 0 ? allTasks()[allTasks().length - 1].id + 1 : 0
    const newTask = new Task(newId, name, desc, days, prior)

    existingItems.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(existingItems))
    closeModal()
    msgContainer.style.display='flex'
    msgContainer.children[0].innerHTML='New Task Added'
    return setTimeout(() => {location.reload()}, 2000) // Método provisório
}

function displayTasks(filter = 'all') {
    const sectionAllTasks = tasksContainerList[0].childNodes[1]
    const existingItems = allTasks()

    if(!existingItems) {
        return sectionAllTasks.innerHTML = '<h3>Nenhum item para mostrar</h3>'
    }

    existingItems.map(task => sectionAllTasks.innerHTML+=`
        <li draggable='true' class='task-card' onclick='finishTask(${task.id})'>
            <div class='left'>
                <h3>${task.name}</h3>
                <p>${task.days === 0 ? 'Today' : 'MODIFICAR ISSO MAIS TARDE EX: mon, tue, wed, ...'}</p> 
            </div>
            <div class='right'></div>
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
    msgContainer.style.display='flex'
    msgContainer.children[0].innerHTML = 'Task Completed'
    return setTimeout(() => {location.reload()}, 700) // Método provisório
}

// Calendar Logic
function showCalendarDays() {
    const date = new Date()
    const btnCalendarTitle = document.querySelector('.calendar-title')
    const calendarMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    const calendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const headerCalendar = document.querySelector('.app-header .calendar')
    const currentDay = date.getDay()
    const currentDate = date.getDate()
    const lastDayCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const midHeader = document.querySelector('.mid-header')
    const dateCards = []
    let displayCalendar = false;
    let dateCardsHTML = []
    let CurrentDateCard
    
    function calendarStatus() {
        if(displayCalendar) {
            headerCalendar.style.display="flex"
        }else {
            headerCalendar.style.display='none'
        }
    }

    headerCalendar.style.display="none"
    btnCalendarTitle.addEventListener('click', ()=> {
        if(displayCalendar) {
            displayCalendar = false
        }else {
            displayCalendar = true
        }
        calendarStatus()
    })

    for(let i = currentDate, day = currentDay; i <= lastDayCurrentMonth; i++) {
        if(day > 6) {
            day = 0
        }
        const cardObject = {
            date: i,
            day: calendarDays[day]
        }

        dateCards.push(cardObject)
        day++
    }

    dateCards.map(card=>headerCalendar.innerHTML+=`
        <button class="btn date-card">
            <strong>${card.date}</strong>
            ${card.day}
        </button>`
    )

    btnCalendarTitle.innerHTML=`
        ${calendarMonths[date.getMonth()]} 
        <i class="fa-sharp fa-solid fa-chevron-down"></i>
    `

    dateCardsHTML = document.querySelectorAll('.calendar .date-card')
    alternateClickable(dateCardsHTML, 'active')
    dateCardsHTML[0].classList.add('active')
    CurrentDateCard = dateCardsHTML[0].cloneNode(true)
    midHeader.appendChild(CurrentDateCard)
}

displayTasks()
showCalendarDays()

alternateClickable(taskLinks, 'active', tasksContainerList, 'disable')
btnOpenModal.addEventListener('click', openModal)
taskLinks[0].childNodes[1].textContent = allTasks().length