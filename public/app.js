//grab all articles as json, display on page
$.getJSON("/articles", function(data){
    for (var i=0; i<data.length; i++){
        $("#articles").append(`

        <div class="card" style="width: 35rem;">
            <div class="card-body">
                <h5 class="card-title" data-id="${data[i]._id}">${data[i].title}</h5>
                <p class="card-text">${data[i].link}</p>
                <button type="button" class="btn btn-danger noteBtn" data-id="${data[i]._id}">Add a Note</button>
            </div>
        </div>
        <br/>
        `);
    }
});

//click event for adding a note
$(document).on("click", ".noteBtn", function(){
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data){
        console.log(data);
        $("#notes").append(`

            <form>
                <h3>Insert a Note</h3>
                <h5>${data.title}</h5>
                <div class="form-group">
                    <label for="noteTitle">Title:</label>
                    <input type="note" class="form-control" id="titleInput" name="title">
                </div>
                <div class="form-group">
                    <label for="noteBody">Note:</label>
                    <textarea class="form-control" id="bodyInput" rows="3"></textarea>
                </div>
                <button type="submit" class="btn" data-id="${data._id}" id="savenote">Save Note</button>
                <button type="submit" class="btn btn-danger" data-id="${data._id}" id="deletenote">Delete Note</button>
            </form>
        `);

        if (data.note){
            $("#titleInput").val(data.note.title);
            $("#bodyInput").val(data.note.body);
        }
    });
});

//click event for saving a note
$(document).on("click", "#savenote", function(){
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
        .then(function(data){
            console.log(data);
            $("#notes").empty();
        });
    $("#titleInput").val("");
    $("#bodyInput").val("");
});

$(document).on("click", "#deletenote", function(){
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/del/" + thisId
    })
        .then(function(data){
            $("notes").empty();
        });
    $("#titleInput").val("");
    $("#bodyInput").val("");
})