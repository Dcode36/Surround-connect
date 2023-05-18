// Check if notes exist in localStorage
if (!localStorage.notes) {
    let newObj = [];
    localStorage.setItem('notes', JSON.stringify(newObj));
} else {
    showNotes();
}

// Submit and DeleteAll buttons
let submitBtn = document.querySelector('#submitBtn');
let delAllBtn = document.querySelector('#delAllBtn');

// Event listener for Post button
submitBtn.addEventListener('click', createNewNote);

// Create a new note
function createNewNote() {
    // Get input values
    let title = document.querySelector('#title').value.trim();
    let note = document.querySelector('#note').value.trim();
    let date = document.querySelector('#date').value.trim();
    let location = document.querySelector('#location').value.trim();

    // Check if inputs are empty
    if (title === '' || note === '' || date === '' || location === '') {
        return false;
    }

    // Create new note object
    let newNote = {
        'title': title,
        'date': date,
        'location': location,
        'desc': note
    };

    // Retrieve notes from localStorage
    let newObj = JSON.parse(localStorage.getItem('notes')) || [];

    // Push new note to notes array
    newObj.push(newNote);

    // Store updated notes in localStorage
    localStorage.setItem('notes', JSON.stringify(newObj));

    // Clear input values
    document.querySelector('#title').value = '';
    document.querySelector('#note').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#location').value = '';

    // Display updated notes
    showNotes();
}

// Show all notes
function showNotes() {
    let parentNode = document.querySelector('.row');
    parentNode.innerHTML = '';

    // Retrieve notes from localStorage
    let allNotes = JSON.parse(localStorage.getItem('notes'));

    allNotes.forEach((element, index) => {
        let clonedNode = document.getElementById('new-note').cloneNode(true);
        clonedNode.id = `note-${index}`;
        clonedNode.style.display = 'block';

        // Update note values
        clonedNode.querySelector('h5').innerText = element.title;
        clonedNode.querySelector('.card-date').innerText = element.date;
        clonedNode.querySelector('.location').innerText = element.location;
        clonedNode.querySelector('.card-text').innerText = element.desc;

        // Add delete button functionality
        clonedNode.querySelector('.delete-btn').addEventListener('click', () => {
            delOneNote(index);
        });

        parentNode.appendChild(clonedNode);
    });
}

// Delete a single note
function delOneNote(index) {
    let newObj = JSON.parse(localStorage.getItem('notes'));

    newObj.splice(index, 1);

    // Store updated notes in localStorage
    localStorage.setItem('notes', JSON.stringify(newObj));

    // Display updated notes
    showNotes();
}

// Delete all notes
function delAllNote() {
    let newObj = [];
    localStorage.setItem('notes', JSON.stringify(newObj));

    // Display updated notes
    showNotes();
}
