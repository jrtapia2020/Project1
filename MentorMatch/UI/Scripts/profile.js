var profile = sessionStorage.getItem("profileSelector");

function ProfileButtonHandler() {
    switch (profile) {
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