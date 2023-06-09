const appHeader = document.querySelector('.app-header')
const appMain = document.querySelector('.app-main')
const appFooter = document.querySelector('app-footer')
const btnOpenModal = document.querySelector('.btn#add_new-task')
const taskLinks = document.querySelectorAll('.app-main .tasks ul li')
const modal = document.querySelector('.task-modal')
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