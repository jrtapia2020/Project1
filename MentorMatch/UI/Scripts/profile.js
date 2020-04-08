"use strict";

let username = sessionStorage.getItem("username");
let profilePic = `../Images/${username}.jpg`;
//let profilePic = '../Images/profilePic.png';  || Needs to be worked on to allow for a default picture when user does not have one
let fName = sessionStorage.getItem("fName");
let lName = sessionStorage.getItem("lName");
let jobTitle = sessionStorage.getItem("jobTitle");
let email = sessionStorage.getItem("email");
let bio = sessionStorage.getItem("bio");
let personality = sessionStorage.getItem("personality");

// Finish all personalities. 
switch (personality) {
    case "ENTP": 
        personality = "Architect";
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
    document.getElementById("email").href = `mailto:${email}`;
    document.getElementById("profileBio").innerHTML = bio;
}