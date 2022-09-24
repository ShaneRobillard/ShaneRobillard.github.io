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
    document.getElementById("price").innerHTML = "Your "+servers+ " servers will cost you: $" +price+ "!";
}

function bandwidth(){
    var bandwidth = document.getElementById("bandwidthcost").value;
    var costs = bandwidth * 60;
    document.getElementById("costs").innerHTML = "The total price for requested bandwidth is $" +costs+ " a month!";
}

function frontServices(){
    var firstfront = document.getElementById("firstfront").value;
    var secondfront = document.getElementById("secondfront").value;
    var services = firstfront * secondfront * 175;
    document.getElementById("frontservices").innerHTML = "The price of the service is: $" +services+ ".";
}

function backServices(){
    var firstback = document.getElementById("firstback").value;
    var secondback = document.getElementById("secondback").value;
    var services = firstback * secondback * 215;
    document.getElementById("backservices").innerHTML = "The price of the service is: $" +services+ ".";
}

function webServices(){
    var firstweb = document.getElementById("firstweb").value;
    var secondweb = document.getElementById("secondweb").value;
    var services = firstweb * secondweb * 150;
    document.getElementById("webservices").innerHTML = "The price of the service is: $" +services+ ".";
}