var x = "";
var y = "";

function reset(){
    document.getElementById("answer").value="";
    var x="";
    var y="";
}

function number(value){
    document.getElementById("answer").value += value;
    return value;
}

function calc(){
    let x = document.getElementById("answer").value;
    let y = eval(x);
    document.getElementById('answer').value = y;
    return y;
}