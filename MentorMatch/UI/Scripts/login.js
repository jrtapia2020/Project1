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

function ClearForm() {
    $("#user").val("");
    $("#password").val("");
}