"use strict";

var employees = sessionStorage.getItem("employees");
var tableRows = document.getElementsByClassName("tableRow");

function initialize(){

    var webMethod = "../../ProjectServices.asmx/LoadEmployees";
    var parameters = "{}";

    //jQuery ajax method
    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responseFromServer = msg.d;
            if (responseFromServer[0][0] == "error") {
                alert(responseFromServer[1][0]);
            } else {
                // Load in Array of Arrays for each employee and create new table row adding the info using a loop
                responseFromServer.forEach(employee => {
                    // Create new row at the end of the table
                    let row = document.getElementById("empTable").insertRow(-1);
                    row.className = "tableRow";
                    row.id = `${employee[4]}`;
                    // Insert cells in row created
                    let cell0 = row.insertCell(0);
                    let cell1 = row.insertCell(1);
                    let cell2 = row.insertCell(2);
                    let cell3 = row.insertCell(3);
                    let cell4 = row.insertCell(4);
                    // Insert data in cells
                    cell0.innerHTML = `<img src="../Images/${employee[4]}.jpg" class="picture">`;
                    cell1.innerHTML = `<a id="empName" href="#">${employee[0]} ${employee[1]}</a>`;
                    cell2.innerHTML = employee[2];
                    cell3.innerHTML = employee[3];
                    cell4.innerHTML = `<a href="mailto:${employee[6]}" class="emailBtn" id="myEmail">Email</a>`
                });
                document.getElementById("empTableDiv").style.display = "block";
            }
        },
        error: function (e) {
            alert("Error: Unable to access the webservice.");
        }
    }); 
}

// Search for employee based on input
function SearchEmployee(){
    // Get value of search bar
    var searchInput = document.getElementById("searchText").value;
    var rowIds = [];
    // Do nothing if no input
    if (searchInput != "") {
        for (var i=0; i<tableRows.length; i++) {
            // Hiding all rows
            tableRows.item(i).style.display = "none";   
            // Displaying row if matches search bar input 
            rowIds.push(tableRows.item(i).id)
        }
        if (rowIds.includes(searchInput)) {
            tableRows.item(rowIds.indexOf(searchInput)).style.display = "table-row";
        }  
        else {
            alert("No matching record found.")
            ClearSearch();
        }
    }
}

// Clear Search Bar Load all Employees Again
function ClearSearch() {
    // Clear search bar
    $("#searchText").val("");
    // Display all rows
    for (var i=0; i<tableRows.length; i++) {
        tableRows.item(i).style.display = "table-row";
    }
}