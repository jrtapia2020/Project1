var profileSelector;

function LoginButtonHandler() {

    var username = $("#user").val();
    var password = $("#password").val();

    var webMethod = "../../ProjectServices.asmx/ConnectToServer";
    var parameters = "{employeeUsername: " + JSON.stringify(username) + ", employeePassword: " +JSON.stringify(password) + "}";

    if (username == "" || password == "") {
        alert("Username or Password cannot be empty. Please input valid credentials.")
    } else {
    //jQuery ajax method
    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responseFromServer = msg.d;
            if (responseFromServer[0] == "incorrect") {
                alert("Incorrect Username or password.");
            } else {
                sessionStorage.setItem("username", responseFromServer[0]);
                sessionStorage.setItem("fName", responseFromServer[1]);
                sessionStorage.setItem("lName", responseFromServer[2]);
                sessionStorage.setItem("jobTitle", responseFromServer[3]);
                sessionStorage.setItem("email", responseFromServer[4]);
                sessionStorage.setItem("bio", responseFromServer[5]);
                sessionStorage.setItem("personality", responseFromServer[6]);
                sessionStorage.setItem("skill", responseFromServer[7]);
                sessionStorage.setItem("mentorID", responseFromServer[8]);
                ClearForm();
                window.location.replace("homePage.html");
            }
        },
        error: function (e) {
            alert("Error: Unable to access the webservice.");
        }
    });
    } 
}

function ProfileButtonHandler(){
    switch (profileSelector){
        case "lknope":
            window.location.replace("leslieProfile.html");
            break
        case "rswanson":
            window.location.replace("ronProfile.html");
            break
        case "thaverford":
            window.location.replace("tomProfile.html");
            break
        case "dmeagle":
            window.location.replace("donnaProfile.html");
            break
        case "adwyer":
            window.location.replace("andyProfile.html");
            break
        case "bwyatt":
            window.location.replace("benProfile.html");
            break
        case "ctraeger":
            window.location.replace("chrisProfile.html");
            break
        default:
            window.location.replace("profile.html");
    }
}


function ClearForm() {
    $("#user").val("");
    $("#password").val("");
}