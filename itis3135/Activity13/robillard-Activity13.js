// $(document).ready(function() {
//     $.ajax({
//         type: "get",
//         url: "team.json",
//         beforeSend: function() {
//             $("#team").html("Loading...");
//         },
//         timeout: 10000,
//         error: function(xhr, status, error) {
//             alert("Error: " + xhr.status + " - " + error);
//         },
//         dataType: "json",
//         success: function(data) {
//             $("#team").html("");
//             $(data).find("management").children().each(function() {
//                 var xmlDoc = $(this);
//                 $("#team").append
//                 ("<h3>" + xmlDoc.find("name").text() + "</h3>" +
//                           xmlDoc.find("title").text() + "<br>" +
//                           xmlDoc.find("bio").text() + "<br>");
//             });
//         }
//     });
// });

$(document).ready(function(){ 
    $.getJSON("team.json", function(par){ 
        $.each(par, function() { 
            $.each(this, function(key, item) {  
                $("#team").append( 
                    "<h3>" + item.name + "</h3>" +  
                    "<p>" + item.title + "</p>" +  
                    "<p>" +item.bio + "</p>" 
                ); 
            }); 
        });  
    }); 
}); 
