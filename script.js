document.addEventListener('DOMContentLoaded', (event) => {
    loadLoans();
});

document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const item = document.getElementById('item').value;
    const person = document.getElementById('person').value;
    const dateTime = new Date().toLocaleString();

    addLoan(item, dateTime, person);
    saveLoans();
    document.getElementById('loanForm').reset();
});

function addLoan(item, dateTime, person) {
    const loanList = document.getElementById('loanList');

    const loanItem = document.createElement('div');
    loanItem.className = 'loan-item';

    const itemDiv = document.createElement('div');
    itemDiv.textContent = `Objet: ${item}`;

    const dateTimeDiv = document.createElement('div');
    dateTimeDiv.textContent = `Date: ${dateTime}`;

    const personDiv = document.createElement('div');
    personDiv.textContent = `Eleve: ${person}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        loanList.removeChild(loanItem);
        saveLoans();
    });

    loanItem.appendChild(itemDiv);
    loanItem.appendChild(dateTimeDiv);
    loanItem.appendChild(personDiv);
    loanItem.appendChild(deleteButton);

    loanList.appendChild(loanItem);
}

function saveLoans() {
    const loanList = document.getElementById('loanList');
    const loanItems = loanList.getElementsByClassName('loan-item');
    const loans = [];

    for (let i = 0; i < loanItems.length; i++) {
        const itemDiv = loanItems[i].children[0];
        const dateTimeDiv = loanItems[i].children[1];
        const personDiv = loanItems[i].children[2];

        loans.push({
            item: itemDiv.textContent.replace('Objet: ', ''),
            dateTime: dateTimeDiv.textContent.replace('Date: ', ''),
            person: personDiv.textContent.replace('Eleve: ', '')
        });
    }

    localStorage.setItem('loans', JSON.stringify(loans));
}

function loadLoans() {
    const loans = JSON.parse(localStorage.getItem('loans')) || [];

    loans.forEach(loan => {
        addLoan(loan.item, loan.dateTime, loan.person);
    });
}
