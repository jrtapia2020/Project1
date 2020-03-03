var profileSelector;

function LoginButtonHandler() {

    var username = $("#user").val();
    var password = $("#password").val();

    var webMethod = "../../ProjectServices.asmx/ConnectToServer";
    var parameters = "{username: " + JSON.stringify(username) + ", password: " +JSON.stringify(password) + "}";

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
            if (responseFromServer == "Incorrect Username or password.") {
                alert(responseFromServer);
            } else {
                profileSelector = responseFromServer;
                sessionStorage.setItem("profileSelector", profileSelector);
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