const $notes = $("#notes");

function runNotesQuery() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (notesData) {
    notesData.forEach(printNote)
  });
};

function printNote(noteInfo) {
  const $card = $("<div>")
    .addClass("card mb-2")

  const $noteTitle = $("<div>")
    .addClass("note card-header")
    .text(noteInfo.title)
    .attr("data-id", noteInfo.id)
    .appendTo($card);

  $notes.append($card);
};

$(document).ready(runNotesQuery);

$(document).ready(function () {
  // Event listener for submitting note/click add note button
  $("#note-form").on("submit", function (event) {
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
      alert(`Your note was added.`);
    });

    $("#note-title").val("");
    $("#note-body").val("");
    $("#notes").empty();
    runNotesQuery();
  });

  // Event listener for clicking delete note button
  $("#delete-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/api/notes",
      method: "DELETE"
    }).then(function () {
      $("#note-title").val("");
      $("#note-body").val("");
      $("#notes").empty();
      unNotesQuery();
    });
  });

});

// Event listener for clicking on saved note
$(document).on("click", ".note", function () {
  // Grab the id # for the note that was clicked on
  const noteId = $(this).attr("data-id");

  // Do an AJAX call to get all notes. Loop through each note to see if id # is the same as one clicked. If so, set values of form fields equal to text in note
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (notesData) {
    notesData.forEach(note => {
      if (note.id === noteId) {
        $("#note-title").val(note.title);
        $("#note-body").val(note.body);
      };
    });
  });
});