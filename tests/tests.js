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
    let personId = previousData[previousData.length - 1].id
    personId++

    const p = new Person(name, age, job, personId);
    previousData.push(p);
    return localStorage.setItem('person', JSON.stringify(previousData));
}


function getPerson() {
    return JSON.parse(localStorage.getItem('person')) || [];
}

addPerson('Adolfinho', 200, 'Atist');
console.log(getPerson())