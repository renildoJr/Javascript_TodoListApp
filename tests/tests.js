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
    return getPerson().filter(row => row.id === id)[0] || false;
}
