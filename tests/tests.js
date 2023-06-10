const content = document.querySelector('.content')

const person = {
    name: 'Muls',
    age: 32,
    job: "Jumper"
}

function saveData(data) {
    getData('person')
    return localStorage.setItem('person', data+JSON.stringify(data)) 
}

saveData(person)

function getData(data) {
    return JSON.parse(localStorage.getItem(data)) || '[]'
}

// console.log(getData('person'))