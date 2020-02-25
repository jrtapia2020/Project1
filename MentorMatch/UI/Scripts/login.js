function LoginButtonHandler() {

    var username = $("#user").val();
    var password = $("#password").val();

    var webMethod = "../../ProjectServices.asmx/ConnectToServer";
    var parameters = "{username: " + JSON.stringify(username) + ", password: " +JSON.stringify(password) + "}";

    //jQuery ajax method
    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var responseFromServer = msg.d;
            alert(responseFromServer);
            ClearForm()
            // TODO: Change to be in ProjectServices.cs
            window.location.replace("homepage.html")
        },
        error: function (e) {
            alert("Error: Unable to access the webservice.");
        }
    });
}

function ClearForm() {
    $("#user").val("");
    $("#password").val("");
}