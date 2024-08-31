document.addEventListener('DOMContentLoaded', (event) => {
    loadLoans();
});

document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

	var item = "";
    var dropdown = document.getElementById("dropdown");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    if (selectedValue) {
        item = selectedValue;
    } else {
        item = document.getElementById('item').value;
    }
    const person = document.getElementById('person').value;
	const classe = document.getElementById('classe').value;
    const dateTime = new Date().toLocaleString();

    addLoan(item, dateTime, person, classe);
    saveLoans();
    document.getElementById('loanForm').reset();
});

function addLoan(item, dateTime, person, classe) {
    const loanList = document.getElementById('loanList');

    const loanItem = document.createElement('div');
    loanItem.className = 'loan-item';

    const itemDiv = document.createElement('div');
    itemDiv.textContent = `Objet : ${item}`;

    const dateTimeDiv = document.createElement('div');
    dateTimeDiv.textContent = `Date : ${dateTime}`;
	
	const classeDiv = document.createElement('div');
    classeDiv.textContent = `Classe : ${classe}`;

    const personDiv = document.createElement('div');
    personDiv.textContent = `Eleve : ${person}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
	deleteButton.className = 'deleteBtn';
    deleteButton.addEventListener('click', function() {
        loanList.removeChild(loanItem);
        saveLoans(item, dateTime, person, classe);
    });

    loanItem.appendChild(itemDiv);
    loanItem.appendChild(dateTimeDiv);
	loanItem.appendChild(classeDiv);
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
        const personDiv = loanItems[i].children[3];
		const classeDiv = loanItems[i].children[2];

        loans.push({
            item: itemDiv.textContent.replace('Objet : ', ''),
            dateTime: dateTimeDiv.textContent.replace('Date : ', ''),
            person: personDiv.textContent.replace('Eleve : ', ''),
			classe: classeDiv.textContent.replace('Classe : ', '')
        });
    }
    localStorage.setItem('loans', JSON.stringify(loans));
	displayLocalStorageSize();
}

function loadLoans() {
    const loans = JSON.parse(localStorage.getItem('loans')) || [];

    loans.forEach(loan => {
        addLoan(loan.item, loan.dateTime, loan.person, loan.classe);
    });
	displayLocalStorageSize();
}

function getLocalStorageSizeInMB() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += ((localStorage[key].length + key.length) * 2);
        }
    }
    // Convertir les octets en mégaoctets
    return (total / (1024 * 1024)).toFixed(2);
}

function displayLocalStorageSize() {
    const size = getLocalStorageSizeInMB();
    document.getElementById('localStorageSize').innerText = `Taille du local Storage : ${size} Mo`;
}
