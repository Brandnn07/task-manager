// var newNoteList = document.querySelector("#title");
// var newNotetitle = document.querySelector("#title");
// var newNotebody = document.querySelector("#body");
// var submitBtn = document.querySelector("#newNote-submit");
// var deleteBtn = document.querySelector("#newNote-clear");
// var newNotesList = document.querySelector("#newNotes-list");
// var newNote = document.querySelector("#num-newNotes");

// var makeNewNote = function() {
//     $.ajax({
//         url: "/api/newNote",
//         method: "GET"
//     }).then(function(data) {
//         var listItems = [];

//         for (var i = 0; i < data.length; i++) {
//             var newNote = data[i];

//             var li = document.querySelector("<li class='list-group-item'>").data(newNote);
//             var row = document.querySelector("<div class='row'>");
//             var column11 = document.querySelector("<div class='col-11'>");
//             var newNoteBody = document.querySelector("<p>").body('"' + newNote.body + '"');
//             var titleNote = document.querySelector("<p class='float-right'>").body("- " + newNote.title);
//             var clearFix = document.querySelector("<div class='clearfix'>");
//             var ratingNote = document.querySelector("<p class='float-right'>").body(newNote.rating);
//             var column1 = document.querySelector("<div class='col-1'>");
//             var upIcon = document.querySelector("<i class='fas fa-angle-up'>");
//             var downIcon = document.querySelector("<i class='fas fa-angle-down'>");

//             li.insertAdjacentHTML("beforeend",
//                 row.insertAdjacentHTML("beforeend",
//                     column11.insertAdjacentHTML("beforeend",newNoteBody, titleNote, clearFix, ratingNote),
//                     column1.insertAdjacentHTML("beforeend",upIcon, downIcon)
//                 )
//             );

//             listItems.push(li);
//         }

//         newNoteList.empty();

//         newNoteList.insertAdjacentHTML("beforeend",listItems);
//     });
// };

// var submitNewNote = function(event) {
//     event.preventDefault();

//     var newNote = {
//         title: newNotetitle.value.trim(),
//         body: newNotebody.value.trim()
//     };

//     if (!newNote.title || !newNote.body) {
//         alert("Please fill out all the required fields!");
//         return;
//     }

//     $.ajax({
//             url: "/api/newNote",
//             method: "POST",
//             data: newNote
//         })
//         .then(function() {
//             makeNewNote();
//             newNotetitle.value;
//             newNotebody.value;
//         });
// };

// // function to create new notes that get populated to html using ajax GET method from apiRoutes
// var makeNewNotes = function() {
//     $.ajax({
//         method: "GET",
//         url: "/api/newNote"
//     }).then(function(data) {
//         var newNotesListItems = [];

//         for (var i = 0; i < data.length; i++) {
//             console.log(data[i]);
//             var newNotes = data[i];
//             var noteList = document.querySelector("<li class='list-group-item'>");
//             var title = document.querySelector("<p>").text("Title: " + newNotes.title);
//             var body = document.querySelector("<p>").text("Body: " + newNotes.body);
//             var deleteButton = document.querySelector("<button data-noteid= " + newNotes.id + " type='button' class='delete'><span class='fa fa-trash'></button>");
//             noteList.insertAdjacentHTML("beforeend",title, body, deleteButton);

//             newNotesListItems.push(noteList);
//         }

//         newNotesList.insertAdjacentHTML("beforeend",newNotesListItems);
//         newNote.text(newNotesListItems.length);
//     });
// };

// makeNewNotes();
// // delete button that deletes notes 
// document.querySelector(document).addEventListener("click", ".delete", function() {
//     var dataID = document.querySelector(this).data("noteid");
//     $.ajax({
//         url: "/api/newNote/" + dataID,
//         type: "DELETE",
//     }).then(
//         function(data) {
//             location.reload();
//         }
//     );
// })

// submitBtn.addEventListener("click", submitNewNote);


let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
