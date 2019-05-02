const $notes = $("#notes");

// Show save note icon when title entered
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

$(document).ready(runNotesQuery);
$(document).ready(showSaveNoteBtn);

$(document).ready(function () {
  // Event listener for clicking add note button
  $("#add-note").on("click", function (event) {
    event.preventDefault();
    $("#note-title").val("").removeAttr("readonly");
    $("#note-body").val("").removeAttr("readonly");
  })

  // Event listener for clicking save note button
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

  // Event listener for clicking delete note button
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
      if (parseInt(note.id) === parseInt(noteId)) {
        $("#note-title").val(note.title);
        $("#note-body").val(note.body);
      };
    });
  });

  $("#note-title").attr("readonly", "readonly");
  $("#note-body").attr("readonly", "readonly");
  $("#save-note").hide()
});