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
 
switch (personality) {
    case "INTJ": 
        personality = "Architect";
        break;
    default:
        break;
    case "INTP":
        personality = "Logician";
        break;
    default:
        break;
    case "ENTJ":
        personality = "Commander";
        break;
    default:
        break;
    case "ENTP":
        personality = "Debater";
        break;
    default:
        break;
    case "INFJ":
        personality = "Advocate";
        break;
    default:
        break;
    case "INFP":
        personality = "Mediator";
        break;
    default:
        break;
    case "ENFJ":
        personality = "Protagonist";
        break;
    default:
        break;
    case "ENFP":
        personality = "Campaigner";
        break;
    default:
        break;
    case "ISTJ":
        personality = "Logistician";
        break;
    default:
        break;
    case "ISFJ":
        personality = "Defender";
        break;
    default:
        break;
    case "ESTJ":
        personality = "Executive";
        break;
    default:
        break;
    case "ESFJ":
        personality = "Consul";
        break;
    default:
        break;
    case "ISTP":
        personality = "Virtuoso";
        break;
    default:
        break;
    case "ISFP":
        personality = "Adventurer";
        break;
    default:
        break;
    case "ESTP":
        personality = "Entrepreneur";
        break;
    default:
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
    document.getElementById("email").href = `mailto:${email}`;
    document.getElementById("profileBio").innerHTML = bio;
}