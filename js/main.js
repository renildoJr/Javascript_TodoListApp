const appHeader = document.querySelector(".app-header")
const appMain = document.querySelector(".app-main")
const btnOpenModal = document.querySelector(".btn#add_new-task")
const modal = document.querySelector(".task-modal")

function openModal() {
    const inputTaskName = document.querySelector(".new_task-name")
    const inputTaskDesc = document.querySelector(".new_task-description")
    const inputTaskPriority = document.querySelector(".new_task-priotity")
    const btnOptions = document.querySelectorAll(".btn-options .btn")

    inputTaskName.value = ""
    inputTaskDesc.value = ""
    inputTaskPriority.checked = false

    btnOptions.forEach((btn, i, btnArr)=>{
        btn.addEventListener("click", ()=> {
            btnArr.forEach(btn=>btn.classList.remove("btn-active"))
            btn.classList.add("btn-active")
        })
    })

}

function closeModal() {

}

openModal()