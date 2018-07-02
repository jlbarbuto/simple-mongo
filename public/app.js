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
            <h4>
                ${data.title}
            </h4>
            <div class="col">
                <div class="row">
                    <input id="titleInput" name="title">
                </div>
                <br/>
                <div class="row">
                    <textarea id="bodyInput" name="body"></textarea>
                </div>
            </div>
            <br/>
            <button type="button" class="btn" data-id="${data._id}" id="savenote">Save Note</button>
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