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
    .addClass("card")

  const $noteTitle = $("<div>")
    .addClass("card-header")
    .text(noteInfo.title)
    .appendTo($card);

  $notes.append($card);
};

$(document).ready(runNotesQuery);

$(document).ready(function () {
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
  })
})