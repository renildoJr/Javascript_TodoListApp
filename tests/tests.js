class Person {
    id;
    name;
    age;
    job;
    constructor(name, age, job, id) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.job = job;
    }
}

function addPerson(name, age, job) {
    const findSameName = getPerson().find(obj=>obj.name.toLowerCase() === name.toLowerCase()) || false;
    
    if(findSameName) {
        return alert('Essa pessoa já existe. Adicione outra')
    }
    
    const previousData = getPerson();
    let lastId = 0;

    if(previousData.length > 0) {
        lastId = previousData[previousData.length - 1].id + 1;
    }

    const p = new Person(name, age, job, lastId);
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
    const itemToRemove = items.findIndex(obj => obj.id === id)
    if(itemToRemove !== -1) {
        items.splice(itemToRemove, 1);
        return localStorage.setItem('person', JSON.stringify(items)) || false;
    }
    return false;
}

function updateById(id, name, age, job) {
    const items = getPerson();
    const itemToChange = items.findIndex((obj => obj.id === id ));
    items[itemToChange].name = name;
    items[itemToChange].age = age;
    items[itemToChange].job = job;
    return localStorage.setItem('person', JSON.stringify(items))
    
}
