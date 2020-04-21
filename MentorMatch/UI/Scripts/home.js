"use strict";

let usernames = [];

function GetEmployees(){

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
                    usernames.push(employee[4])
                });
                sessionStorage.setItem("usernames", usernames);
            }
        },
        error: function (e) {
            alert("Error: Unable to access the webservice.");
        }
    }); 
}