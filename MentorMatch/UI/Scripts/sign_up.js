function SignUpButtonHandler() {

    var username = $("#user").val();
    var password = $("#password").val();
    var psw_repeat = $("#psw-repeat").val();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var major1 = $("#major1").val();
    var major2 = $("#major2").val();
    var minor1 = $("#minor1").val();
    var minor2 = $("#minor2").val();
    var grade = $("#grade").val();

    if (username == "" || password == "" || psw_repeat == "" || fname == "" || lname == "" || major1 == "") {
        alert("Error: Missing Required Fields! Please Complete Form.");
    }
    else if (password !== psw_repeat){
        alert("Error: Passwords do not match! Please try again.");
    } 
    else {
    var webMethod = "../../ProjectServices.asmx/CreateNewAccount";
    var parameters = "{username: " + JSON.stringify(username) +
                    ", password: " +JSON.stringify(password) + 
                    ", firstname: " +JSON.stringify(fname) +
                    ", lastname: " +JSON.stringify(lname) +
                    ", major1: " +JSON.stringify(major1) +
                    ", major2: " +JSON.stringify(major2) +
                    ", minor1: " +JSON.stringify(minor1) +
                    ", minor2: " +JSON.stringify(minor2) +
                    ", grade: " +JSON.stringify(grade) + "}";

        //jQuery ajax method
        $.ajax({
            type: "POST",
            url: webMethod,
            data: parameters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var responseFromServer = msg.d;
                if (responseFromServer == "New Account was created!") {
                    alert(responseFromServer);
                    ClearForm();
                    window.location.replace("index.html");
                } else {
                    alert(responseFromServer);
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
    $("#psw-repeat").val("");
    $("#fname").val("");
    $("#lname").val("");
    $("#major1").val("");
    $("#major2").val("");
    $("#minor1").val("");
    $("#minor2").val("");
    $("#grade").val("Freshman");
}
