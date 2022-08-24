// ==UserScript==
// @name         Blood Bag Highlights
// @namespace    https://www.torn.com/profiles.php?XID=2190604
// @version      1.0
// @description  Adds colours to the torn item's page to show good vs bad blood types
// @author       Kwack [2190604]
// @match        *://www.torn.com/item.php*
// @match        *://www.torn.com/factions.php?step=your*
// ==/UserScript==

var yourType = ""; //Type can be directly inserted into script
var bags = new Object();

getType();

//adds the actual highlights
function highlightsAdd() {
    if (!yourType) getType();
    for (var bag in bags) {
        var blood; //"good"ness of the blood type
        isBadBloodType(bag) ? (blood = "bad-blood") : (blood = "good-blood");
        if (isArmoury()) {
            bags[bag].forEach((element) =>
                element.parentNode.parentNode.classList.add(blood)
            );
        } else {
            bags[bag].forEach((element) =>
                element.parentNode.parentNode.parentNode.classList.add(blood)
            );
        }
    }
    checkBags();
}
//checks if the page is the faction armoury or the items page
function isArmoury() {
    if (document.URL.includes("factions.php")) return true;
    return false;
}

//checks for blood bags, and if new ones are found, re-calls the highlights
function checkBags() {
    var oldBags = bags;
    var bagsFinder = setInterval(() => {
        bags = {
            AP: document.querySelectorAll(
                "[src='/images/items/732/large.png']"
            ),
            AM: document.querySelectorAll(
                "[src='/images/items/733/large.png']"
            ),
            BP: document.querySelectorAll(
                "[src='/images/items/734/large.png']"
            ),
            BM: document.querySelectorAll(
                "[src='/images/items/735/large.png']"
            ),
            ABP: document.querySelectorAll(
                "[src='/images/items/736/large.png']"
            ),
            ABM: document.querySelectorAll(
                "[src='/images/items/737/large.png']"
            ),
            OP: document.querySelectorAll(
                "[src='/images/items/738/large.png']"
            ),
            OM: document.querySelectorAll(
                "[src='/images/items/739/large.png']"
            ),
        };
        if (bags != oldBags) {
            clearInterval(bagsFinder);
            highlightsAdd();
        }
    }, 300);
}

//local storage modification
function loadType() {
    yourType = localStorage.getItem("highlightBloodBags.yourType");
}
function saveType() {
    localStorage.setItem("highlightBloodBags.yourType", yourType);
}

let GM_addStyle = function (s) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = s;
    document.head.appendChild(style);
};

function isBadBloodType(type) {
    if (!yourType) console.error("You have no type!");
    if (yourType == "ABP") {
        return false;
    } else if (yourType == "ABM") {
        return !["OM", "BM", "AM", "ABM"].includes(type);
    } else if (yourType == "AP") {
        return !["OM", "OP", "AM", "AP"].includes(type);
    } else if (yourType == "AM") {
        return !["OM", "AM"].includes(type);
    } else if (yourType == "BP") {
        return !["OM", "OP", "BM", "BP"].includes(type);
    } else if (yourType == "BM") {
        return !["OM", "BM"].includes(type);
    } else if (yourType == "OP") {
        return !["OM", "OP"].includes(type);
    } else if (yourType == "OM") {
        return type != "OM";
    } else {
        console.error("type bugged");
    }
}

//Attempts to load type from memory, or calls prompt if loading your type fails
function getType() {
    if (!yourType) {
        console.log("attempting to load blood type from local memory");
        loadType();
    } else {
        console.log(
            `blood type ${yourType} loaded directly from script, highlighting blood bags`
        );
        return;
    }
    if (!yourType) {
        console.log("unable to find, prompting for blood type");
        promptForType();
    } else {
        console.log(
            `blood type ${yourType} loaded from memory, highlighting blood bags`
        );
    }
}

//Prompting for type. If wrong type is accidentally inserted, add type to yourType at beginning of script or remove from local memory
function promptForType() {
    yourType = prompt("Please enter your blood type", "AB+");
    while (
        yourType != "A+" &&
        yourType != "B+" &&
        yourType != "AB+" &&
        yourType != "O+" &&
        yourType != "O-" &&
        yourType != "A-" &&
        yourType != "AB-" &&
        yourType != "B-"
    ) {
        yourType = prompt(
            "Invalid blood type, please try again. Format such as A+, A-, B+, etc",
            "AB+"
        );
    }
    if (yourType.slice(-1) == "+") yourType = yourType.slice(0, -1) + "P";
    else yourType = yourType.slice(0, -1) + "M";
    saveType();
    console.log(`Saved blood type as ${yourType}`);
}

var styles = `
.good-blood {
    background-color: var(--default-bg-green-hover-color) !important;
}
.bad-blood {
    background-color: var(--default-bg-red-hover-color) !important;
}
`;
GM_addStyle(styles);
checkBags();
