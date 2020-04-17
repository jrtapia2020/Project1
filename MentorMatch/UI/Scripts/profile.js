"use strict";
// Load Profile information
let username = sessionStorage.getItem("username");
let profilePic = `../Images/${username}.jpg`;
//let profilePic = '../Images/profilePic.png';  || Needs to be worked on to allow for a default picture when user does not have one
let fName = sessionStorage.getItem("fName");
let lName = sessionStorage.getItem("lName");
let jobTitle = sessionStorage.getItem("jobTitle");
let email = sessionStorage.getItem("email");
let bio = sessionStorage.getItem("bio");
let personality = sessionStorage.getItem("personality");
 
switch (personality) {
    case "INTJ": 
        personality = "Architect";
        break;
    case "INTP":
        personality = "Logician";
        break;
    case "ENTJ":
        personality = "Commander";
        break;
    case "ENTP":
        personality = "Debater";
        break;
    case "INFJ":
        personality = "Advocate";
        break;
    case "INFP":
        personality = "Mediator";
        break;
    case "ENFJ":
        personality = "Protagonist";
        break;
    case "ENFP":
        personality = "Campaigner";
        break;
    case "ISTJ":
        personality = "Logistician";
        break;
    case "ISFJ":
        personality = "Defender";
        break;
    case "ESTJ":
        personality = "Executive";
        break;
    case "ESFJ":
        personality = "Consul";
        break;
    case "ISTP":
        personality = "Virtuoso";
        break;
    case "ISFP":
        personality = "Adventurer";
        break;
    case "ESTP":
        personality = "Entrepreneur";
        break;
    case "ESFP":
        personality = "Entertainer";
        break;
    default:
        break;
}

// Profile page has its information changed by the information pulled from the DB
function ProfileHandler() {
    document.getElementById("profilePic").src = profilePic;
    document.getElementById("profileName").innerHTML = `${fName} ${lName}`;
    document.getElementById("profileJobTitle").innerHTML = jobTitle;
    document.getElementById("profilePersonality").innerHTML = personality;
    document.getElementById("myEmail").href = `mailto:${email}`;
    document.getElementById("profileBio").innerHTML = bio;
}
// Open Profile Info Modal
function EditInfo() {
    document.getElementById("infoModal").style.display = "block";
}

function CloseInfoModal() {
    document.getElementById("infoModal").style.display = "none";
}

// Open Profile Picture Modal
function EditPicture() {
    document.getElementById("pictureModal").style.display = "block";
}

function ClosePictureModal() {
    document.getElementById("pictureModal").style.display = "none";
}

// Edit Information AJAX Call
function EditInfoHandler() {

    var newpassword = $("#password").val();
    var newpsw_repeat = $("#psw-repeat").val();
    var newfname = $("#fname").val();
    var newlname = $("#lname").val();
    var newemail = $("#email").val();
    var newjobTitle = $("#jobTitle").val();
    var newpersonalityType = $("#personalityType").val();
    var newbio = $("#newBio").val();


    if (newpassword == "" || newpsw_repeat == "" || newfname == "" || newlname == "" || newemail == "") {
        alert("Error: Missing Required Fields! Please Complete Form.");
    }
    else if (newpassword !== newpsw_repeat){
        alert("Error: Passwords do not match! Please try again.");
    } 
    else {
    var webMethod = "../../ProjectServices.asmx/EditAccountInfo";
    var parameters = "{employeeUsername: " +JSON.stringify(username) +
                    ", employeePassword: " +JSON.stringify(newpassword) + 
                    ", employeeFirstName: " +JSON.stringify(newfname) +
                    ", employeeLastName: " +JSON.stringify(newlname) +
                    ", employeeJobTitle: " +JSON.stringify(newjobTitle) +
                    ", employeeEmail: " +JSON.stringify(newemail) + 
                    ", employeeBio: " +JSON.stringify(newbio) + 
                    ", employeePersonalityType: " +JSON.stringify(newpersonalityType)+"}";


        //jQuery ajax method
        $.ajax({
            type: "POST",
            url: webMethod,
            data: parameters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var responseFromServer = msg.d;
                if (responseFromServer == "Profile Info Updated!") {
                    alert(responseFromServer);
                    ClearForm();
                    CloseInfoModal();
                    window.location.replace("profile.html");
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

// Edit Profile Picture
var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('preview');
      output.src = reader.result;
      document.getElementById('preview').style.display = "inline-block";
    };
    reader.readAsDataURL(event.target.files[0]);
};

let newPic = "";
$(document).ready(function(){
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        newPic = fileName;
        if (fileName.slice(-3) !== "jpg") {
            alert(`File ${fileName} is not the correct file type of ".jpg".\nPlease use the correct file type.`)
            document.getElementById('newProfilePic').value = null;
            document.getElementById('preview').style.display = "none";
        } else if (fileName.slice(0,-4) !== username) {
            alert(`File ${fileName} is not using the correct naming format.\nPlease name the file after your username.`)
            document.getElementById('newProfilePic').value = null;
            document.getElementById('preview').style.display = "none";
        }
    });
});
/*
document.getElementById('uploader').onsubmit = function () {
    var formdata = new FormData(); //FormData object
    var fileInput = document.getElementById('newProfilePic');
    //Iterating through each files selected in fileInput
    for (i = 0; i < fileInput.files.length; i++) {
        //Appending each file to FormData object
        formdata.append(fileInput.files[i].name, fileInput.files[i]);
    }
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../ProjectServices.asmx/Upload');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }
    return false;
}   
*/