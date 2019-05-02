const $notes = $("#notes");

// Show save note icon when title input field changed
function showSaveNoteBtn() {
  $("#note-title").change(function () {
    $("#save-note").css("display", "inline");
  })
};

// Adds saved notes to page
function runNotesQuery() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (notesData) {
    notesData.forEach(printNote)
  });
};

// Formating for printing saved notes to page
function printNote(noteInfo) {
  const $li = $("<li>")
    .addClass("list-group-item d-flex align-items-center justify-content-between border-top-0 border-bottom py-3");

  const $noteTitle = $("<span>")
    .addClass("note")
    .text(noteInfo.title)
    .attr("data-id", noteInfo.id)
    .appendTo($li);

  const $trashCan = $("<i>")
    .addClass("fas fa-trash-alt text-danger delete-note")
    .attr("data-id", noteInfo.id)
    .appendTo($li);

  $notes.append($li);
};

// Run runNotesQuery and showSaveNoteBtn functions when page loads
$(document).ready(runNotesQuery);
$(document).ready(showSaveNoteBtn);

// When the page loads...
$(document).ready(function () {
  // Add event listener for clicking add-note button
  $("#add-note").on("click", function (event) {
    event.preventDefault();
    $("#note-title").val("").removeAttr("readonly");
    $("#note-body").val("").removeAttr("readonly");
  })

  // Add event listener for clicking save-note button
  $("#save-note").on("click", function (event) {
    event.preventDefault();
    const newNote = {
      title: $("#note-title").val().trim(),
      body: $("#note-body").val().trim()
    };

    if (!newNote.title || !newNote.body) {
      return false;
    };

    $.ajax({
      url: "/api/notes",
      method: "POST",
      data: newNote
    }).then(function (apiResponse) {

    });

    $("#note-title").val("");
    $("#note-body").val("");
    $("#notes").empty();
    runNotesQuery();
    $("#save-note").hide();
    showSaveNoteBtn();
  });

  // Add event listener for clicking delete-note button
  $(document).on("click", ".delete-note", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/api/notes/" + $(this).attr("data-id"),
      method: "DELETE"
    }).then(function () {
      $("#note-title").val("");
      $("#note-body").val("");
      $("#notes").empty();
      runNotesQuery();
    });
  });

});

// Add event listener for clicking on saved note
$(document).on("click", ".note", function () {
  // Grab the id # for the note that was clicked on
  const noteId = $(this).attr("data-id");

  // Do an AJAX call to get all notes.
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (notesData) {
    // Find note with corresponding id
    const $note = notesData.find(note => parseInt(note.id) === parseInt(noteId));
    // Post to page
    $("#note-title").val($note.title);
    $("#note-body").val($note.body);
  });

  // Change attr to "readonly" so user cannot edit text
  $("#note-title").attr("readonly", "readonly");
  $("#note-body").attr("readonly", "readonly");

  // Hide save-note button
  $("#save-note").hide()
});