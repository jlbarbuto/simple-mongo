//grab all articles as json, display on page
$.getJSON("/articles", function(data){
    for (var i=0; i<data.length; i++){
        $("#articles").append(`
        <div class="articleGroup">
            <p>
                ${data[i].title}
                <br/>
                ${data[i].link}
            </p>
            <button type="button" class="btn btn-danger noteBtn" data-id="${data[i]._id}">
                Add a Note
            </button>
            <div class="notes" data-id="${data[i]._id}"></div>
            <br />
            <br />
            <br />
        </div>
        `);
    }
});

//click event for adding a note
$(document).on("click", ".noteBtn", function(){
    $(".notes").empty();
    var thisId = $(this).attr("data-id");
    
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data){
        console.log(data);
        $(".notes").append(`
            <h2>
                ${data.title}
            </h2>
            <input id="titleInput" name="title">
            <textarea id="bodyInput" name="body"></textarea>
            <button type="button" class="btn" data-id="${data._id}" id="savenote">Save Note</button>
        `);

        if (data.note){
            $("#titleInput").val(data.note.title);
            $("bodyInput").val(data.note.body);
        }
    });
});