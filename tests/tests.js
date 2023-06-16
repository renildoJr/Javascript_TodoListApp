const content = document.querySelector('.content')

class Person {
    id;
    name;
    age;
    job;
    constructor(name, bornYear, job, id) {
        this.id = id;
        this.name = name;
        this.age = new Date().getFullYear() - bornYear;
        this.job = job;
    }
}

function addPerson(name, bornYear, job) {
    const findSameName = getPerson().find(obj=>obj.name.toLowerCase() === name.toLowerCase()) || false;
    
    if(findSameName) {
        return alert('Essa pessoa já existe. Adicione outra')
    }
    
    const previousData = getPerson();
    let lastId = 0;

    if(previousData.length > 0) {
        lastId = previousData[previousData.length - 1].id + 1;
    }

    const p = new Person(name, bornYear, job, lastId);
    previousData.push(p);

    return localStorage.setItem('person', JSON.stringify(previousData));
}

function getPerson() {
    return JSON.parse(localStorage.getItem('person')) || [];
}

function getById(id) {
    return getPerson().find(obj => obj.id === id) || false;
}

function removeById(id) {
    const items = getPerson();
    const itemToRemove = items.findIndex(obj => obj.id === id);
    const itemName =  getPerson()[itemToRemove].name;

    const areYouSure = confirm(`Tem certeza que quer remover ${itemName}?`);

    if((itemToRemove !== -1) && areYouSure) {
        items.splice(itemToRemove, 1);
        return localStorage.setItem('person', JSON.stringify(items)) || false;
    }

    return false;
}

function updateById(id, name, bornYear, job) {
    const items = getPerson();
    const itemToChange = items.findIndex((obj => obj.id === id ));
    items[itemToChange].name = name;
    items[itemToChange].age = bornYear;
    items[itemToChange].job = job;
    return localStorage.setItem('person', JSON.stringify(items))
}

function listAll(sortBy) {
    return getPerson().map(person=>
        content.innerHTML+=`
        <li class="card">
            <button class="btn" id="update">Edit</button>
            <button class="btn" id="delete" onclick="removeById(${person.id})">Remove</button>
            <div class="card-info">
                <span class="info"><strong>Name: </strong>${person.name}</spa> 
                <span class="info"><strong>Age: </strong>${person.age}</spa> 
                <span class="info"><strong>Occupation: </strong>${person.job}</spa> 
            </div>
        </li>`
    ) 
}

listAll('name')