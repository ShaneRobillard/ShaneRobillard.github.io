var names = [];
var salaries = [];

function addSalary() {   
    var inputName = document.getElementById("employee").value; 
    var inputSalary = document.getElementById("salary").value;
    if ((inputSalary == "") || (isNaN(inputSalary))) {
        alert("Please enter a valid salary!");
        inputSalary = "";
        document.getElementById("employee").focus();
    }else{
        if(names.includes(inputName)){
            var index = names.indexOf(inputName);
            salaries[index] = inputSalary;
        }else{
            inputSalary = parseFloat(inputSalary);
            names.push(inputName);
            salaries.push(inputSalary);
            document.getElementById("salary").value = "";
            document.getElementById("employee").focus();   
        }
    }
}

function displayResults() {
    var sum = 0;
    var high = 0;
    const average = salaries.reduce((a, b) => a + b) / salaries.length;
    for(j = 0; j < salaries.length; j++){
        if(salaries[j] > high){
            high = salaries[j];
        }
    }
    document.getElementById("results").innerHTML = "<h2>Results</h2>" + "<p>Average Salary is: $" +average+ "</p>" + "<p>The highest salary is: $" +high+ "</p>";
}

function displaySalary() {
    var table;
    table = "<table><tr><th>Employee</th><th>Salary</th></tr>"
    for (i = 0; i < salaries.length; i++){
        table += "<tr><td>" + names[i] + "</td><td>" + salaries[i] + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("results_table").innerHTML = table;
}