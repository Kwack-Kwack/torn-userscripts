// ==UserScript==
// @name         Blood Bag Highlights
// @namespace    https://www.torn.com/profiles.php?XID=2190604
// @version      1.0
// @description  Adds colours to the torn item's page to show good vs bad blood types
// @author       Kwack [2190604]
// @match        *://www.torn.com/item.php*
// @match        *://www.torn.com/factions.php?step=your*
// ==/UserScript==

var yourType = "";
loadType();
var test;
var bags = [];
console.log("test");
var interval = 300;
startInterval();
function startInterval() {
    test = setTimeout(pagechecker, 300);
}
function pagechecker() {
    if (
        document.getElementsByClassName("good-blood").length ||
        document.getElementsByClassName("bad-blood").length
    ) {
        interval = 1000;
    } else {
        interval = 300;
    }
    bags = {
        AP: document.querySelectorAll("[src='/images/items/732/large.png']"),
        AM: document.querySelectorAll("[src='/images/items/733/large.png']"),
        BP: document.querySelectorAll("[src='/images/items/734/large.png']"),
        BM: document.querySelectorAll("[src='/images/items/735/large.png']"),
        ABP: document.querySelectorAll("[src='/images/items/736/large.png']"),
        ABM: document.querySelectorAll("[src='/images/items/737/large.png']"),
        OP: document.querySelectorAll("[src='/images/items/738/large.png']"),
        OM: document.querySelectorAll("[src='/images/items/739/large.png']"),
    };
    highlightBags(bags.AP, "A+");
    highlightBags(bags.AM, "A-");
    highlightBags(bags.BP, "B+");
    highlightBags(bags.BM, "B-");
    highlightBags(bags.ABP, "AB+");
    highlightBags(bags.ABM, "AB-");
    highlightBags(bags.OP, "O+");
    highlightBags(bags.OM, "O-");
    test = setTimeout(pagechecker, interval);
}

function stopInterval() {
    clearTimeout(test);
}
function highlightBags(bags, type) {
    if (!bags) return;
    bags.forEach((bag) => {
        if (document.URL.includes("factions.php"))
            isBadBloodType(type)
                ? bag.parentNode.parentNode.classList.add("bad-blood")
                : bag.parentNode.parentNode.classList.add("good-blood");
        else
            isBadBloodType(type)
                ? bag.parentNode.parentNode.parentNode.classList.add(
                      "bad-blood"
                  )
                : bag.parentNode.parentNode.parentNode.classList.add(
                      "good-blood"
                  );
    });
}

//modified from old tornCAT filter script
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
    if (yourType == "AB+") {
        return false;
    } else if (yourType == "AB-") {
        return !["O-", "B-", "A-", "AB-"].includes(type);
    } else if (yourType == "A+") {
        return !["O-", "O+", "A-", "A+"].includes(type);
    } else if (yourType == "A-") {
        return !["O-", "A-"].includes(type);
    } else if (yourType == "B+") {
        return !["O-", "O+", "B-", "B+"].includes(type);
    } else if (yourType == "B-") {
        return !["O-", "B-"].includes(type);
    } else if (yourType == "O+") {
        return !["O-", "O+"].includes(type);
    } else if (yourType == "O-") {
        return type != "O-";
    } else {
        console.log("type bugged");
    }
}
function getType() {
    if (!yourType) {
        console.log("attempting to load blood type from local memory");
        loadType();
    } else
        console.log(
            `blood type ${yourType} loaded directly from script, highlighting blood bags`
        );

    if (!yourType) {
        console.log("unable to find, prompting for blood type");
        promptForType();
    } else
        console.log(
            `blood type ${yourType} loaded from memory, highlighting blood bags`
        );
}
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
