window.onload = function(){    
   var date = new Date();
    var day = date.toDateString();
    var time = date.toLocaleTimeString();
    document.getElementById("date").innerHTML = time + " " + day;
}

function nameAndFeeling(){
    var name = document.getElementById("name").value;
    var feeling = document.getElementById("feeling").value;
    document.getElementById("greeting").innerHTML = "Robillard Industries welcomes you, " +name+ "! We are glad you are feeling " +feeling+ "!";
}

function server(){
    var servers = document.getElementById("servers").value;
    var months = document.getElementById("months").value;
    var price = servers * months * 35;    
    document.getElementById("price").innerHTML = "Your "+servers+ " servers will cost you $" +price+ "!";
}

function product(){
    var first = document.getElementById("first").value;
    var second = document.getElementById("second").value;
    var multiply = first * second;
    document.getElementById("product").innerHTML = "The product of the two numbers you entered is: " +multiply+ ".";
}