"use strict";
// Load Profile information
let mentorUsername = sessionStorage.getItem("mentorUsername");
let profilePic = `../Images/${mentorUsername}.jpg`;
let mentorFname = sessionStorage.getItem("mentorFname");
let mentorLname = sessionStorage.getItem("mentorLname");
let mentorJobTitle = sessionStorage.getItem("mentorJobTitle");
let mentorEmail = sessionStorage.getItem("mentorEmail");
let mentorBio = sessionStorage.getItem("mentorBio");
let mentorPersonality = sessionStorage.getItem("mentorPersonality");
let mentorSkill = sessionStorage.getItem("mentorSkill");
 
switch (mentorPersonality) {
    case "INTJ": 
        mentorPersonality = "Architect";
        break;
    case "INTP":
        mentorPersonality = "Logician";
        break;
    case "ENTJ":
        mentorPersonality = "Commander";
        break;
    case "ENTP":
        mentorPersonality = "Debater";
        break;
    case "INFJ":
        mentorPersonality = "Advocate";
        break;
    case "INFP":
        mentorPersonality = "Mediator";
        break;
    case "ENFJ":
        mentorPersonality = "Protagonist";
        break;
    case "ENFP":
        mentorPersonality = "Campaigner";
        break;
    case "ISTJ":
        mentorPersonality = "Logistician";
        break;
    case "ISFJ":
        mentorPersonality = "Defender";
        break;
    case "ESTJ":
        mentorPersonality = "Executive";
        break;
    case "ESFJ":
        mentorPersonality = "Consul";
        break;
    case "ISTP":
        mentorPersonality = "Virtuoso";
        break;
    case "ISFP":
        mentorPersonality = "Adventurer";
        break;
    case "ESTP":
        mentorPersonality = "Entrepreneur";
        break;
    case "ESFP":
        mentorPersonality = "Entertainer";
        break;
    default:
        break;
}

// Profile page has its information changed by the information pulled from the DB
function MentorHandler() {
    if (username !== null) {
        document.getElementById("profilePic").src = profilePic;
        document.getElementById("profileName").innerHTML = `${mentorFname} ${mentorLname}`;
        document.getElementById("profileJobTitle").innerHTML = mentorJobTitle;
        document.getElementById("profilePersonality").innerHTML = mentorPersonality;
        document.getElementById("myEmail").href = `mailto:${mentorEmail}`;
        document.getElementById("profileBio").innerHTML = mentorBio;
        document.getElementById("profileSkills").innerHTML = mentorSkill;
    }
}