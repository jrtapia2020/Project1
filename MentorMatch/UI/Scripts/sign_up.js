function SignUpButtonHandler() {

    var username = $("#user").val();
    var password = $("#password").val();
    var psw_repeat = $("#psw-repeat").val();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var jobTitle = $("#jobTitle").val();
    var defaultBio = "Hello! Welcome to my page.";


    if (username == "" || password == "" || psw_repeat == "" || fname == "" || lname == "" || email == "") {
        alert("Error: Missing Required Fields! Please Complete Form.");
    }
    else if (password !== psw_repeat){
        alert("Error: Passwords do not match! Please try again.");
    } 
    else {
    var webMethod = "../../ProjectServices.asmx/CreateNewAccount";
    var parameters = "{employeeUsername: " + JSON.stringify(username) +
                    ", employeePassword: " +JSON.stringify(password) + 
                    ", employeeFirstName: " +JSON.stringify(fname) +
                    ", employeeLastName: " +JSON.stringify(lname) +
                    ", employeeJobTitle: " +JSON.stringify(jobTitle) +
                    ", employeeEmail: " +JSON.stringify(email) + 
                    ", employeeBio: " +JSON.stringify(defaultBio) + "}";

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
