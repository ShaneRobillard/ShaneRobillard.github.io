$(document).ready(function() {
	$("#nav_list li").click(function()
    {
        var section = $(this).children("a").attr("title");
        $.ajax({
            type: "get",
            url: "json_files/" + section + ".json",
            error: function(xhr, status, error) {
                alert("Error: " + xhr.status + " - " + error);
            },
            dataType: "json",
            success: function(data){
                $("main").html("");
                $.each(data, function(){
                    $.each(this, function(key, value){
                        $("main").append(
                            $("<h1>" + value.title + "</h1>" + "<h2>" + value.month + "</h2>" + "<h3>" + value.speaker + "</h3>"
                            + "<img src=" + value.image + ">" + "<p>" + value.text + "</p>")
                        );
                    })
                })
            }
        });
    });
});