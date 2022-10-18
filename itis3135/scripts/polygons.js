function promptUser(){
    let numbersides = prompt("The Slow Rabbit would like a number between 0 and 10 for your polygon sides:");
    validateEntry(numbersides);
    getShape(numbersides);
}

function validateEntry(numbersides){
    if(isNaN(numbersides) || numbersides > 11 || numbersides < -11){
        alert("This is not a valid entry!");
        promptUser();
    }else{
        getShape();
    }
}

function getShape(numbersides){
    numbersides = Math.abs(Math.round(numbersides));
    if(numbersides == 0){
        document.getElementById("polygon").innerHTML = "This is not a shape!";
    }else if(numbersides == 1){
        document.getElementById("polygon").innerHTML = "This is a monogon!";
    }else if(numbersides == 2){
        document.getElementById("polygon").innerHTML = "This is a bigon!";
    }else if(numbersides == 3){
        document.getElementById("polygon").innerHTML = "This is a triangle!";
    }else if(numbersides == 4){
        document.getElementById("polygon").innerHTML = "This is a quadrilateral!";
    }else if(numbersides == 5){
        document.getElementById("polygon").innerHTML = "This is a pentagon!";
    }else if(numbersides == 6){
        document.getElementById("polygon").innerHTML = "This is a hexagon!";
    }else if(numbersides == 7){
        document.getElementById("polygon").innerHTML = "This is a heptagon!";
    }else if(numbersides == 8){
        document.getElementById("polygon").innerHTML = "This is a octagon!";
    }else if(numbersides == 9){
        document.getElementById("polygon").innerHTML = "This is a nonagon!";
    }else if(numbersides == 10){
        document.getElementById("polygon").innerHTML = "This is a decagon!";
    }
}

promptUser();