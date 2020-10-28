let charUl = document.querySelector('.char-ul');
let personContainer = document.querySelector('.person-container');
let personName = document.querySelector('.person-name')
let personUl = document.querySelector('.person-ul')

function getData() {
    return new Promise((resolve, reject) => {
        fetch('https://swapi.dev/api/people/')
            .then(resp => resp.json())
            .then(data => resolve(data.results))
            .catch(err => reject(err));
    })
}

getData()
    .then(data => {
        addChars(data);
        addEvents();
    })

function addChars(array) {
    const CHAR_PER_PAGE = 7;
    for (let i = 0; i < CHAR_PER_PAGE; i++) {
        let li = document.createElement('li');
        li.className = 'char-li';
        li.textContent = array[i].name;
        charUl.appendChild(li);
    }
}

function addEvents() {
    let names = document.querySelectorAll('.char-li')
    for (let name of names) {
        name.addEventListener("click", function() {
            personName.textContent = name.textContent;
        });
    }
}