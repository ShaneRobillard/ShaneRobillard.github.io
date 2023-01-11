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
