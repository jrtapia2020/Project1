"use strict";

function initilize(){

    var webMethod ="../../ProjectServices.asmx/ConnectToServer";

    var profile = JSON.stringify(fName) + " " + JSON.stringify(lName) + " "
        + JSON.stringify(jobTitle);

    //jQuery ajax method
    $.ajax({
        type: "POST",
        url: webMethod,
        data: profile,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg){
            sessionStorage.setItem("fName", responseFromServer[0]);
            sessionStorage.setItem("lName", responseFromServer[1]);
            sessionStorage.setItem("jobTitle", responseFromServer[2]);
        },
        error: function(e) {
            alert("Error: Unable to access the webservice.")

        }
    });

    // Need to create for loop take profiles from data base and display them
}