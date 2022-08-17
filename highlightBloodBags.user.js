// ==UserScript==
// @name         Blood Bag Highlights
// @namespace    https://www.torn.com/profiles.php?XID=2190604
// @version      0.1
// @description  Adds colours to the torn item's page to show good vs bad blood types
// @author       Kwack [2190604]
// @match        *://www.torn.com/item.php*
// ==/UserScript==

var yourType = ""; //insert AB+, AB-, A+, A-, B+, B-, O+, or O-
var bagArray = [];

//actually adds the filters
pageReady().then(() => {
    console.log("page ready, blood bag highlights script starting");
    bagArray = [
        APbags,
        AMbags,
        ABPbags,
        ABMbags,
        BPbags,
        BMbags,
        OPbags,
        OMbags,
    ];

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
    for (var i = 0; i < 3; i++) {
        bagArray.forEach((bag, index) => {
            if (bag) bagArray[index] = bag.parentNode;
        });
    }

    if (isBadBloodType("A+")) {
        if (APbags) bagArray[0].classList.add("bad-blood");
    } else {
        if (APbags) bagArray[0].classList.add("good-blood");
    }
    if (isBadBloodType("A-")) {
        if (AMbags) bagArray[1].classList.add("bad-blood");
    } else {
        if (AMbags) bagArray[1].classList.add("good-blood");
    }
    if (isBadBloodType("B+")) {
        if (BPbags) bagArray[4].classList.add("bad-blood");
    } else {
        if (BPbags) bagArray[4].classList.add("good-blood");
    }
    if (isBadBloodType("B-")) {
        if (BMbags) bagArray[5].classList.add("bad-blood");
    } else {
        if (BMbags) bagArray[5].classList.add("good-blood");
    }
    if (isBadBloodType("AB+")) {
        if (ABPbags) bagArray[2].classList.add("bad-blood");
    } else {
        if (ABPbags) bagArray[2].classList.add("good-blood");
    }
    if (isBadBloodType("AB-")) {
        if (ABMbags) bagArray[3].classList.add("bad-blood");
    } else {
        if (ABMbags) bagArray[3].classList.add("good-blood");
    }
    if (isBadBloodType("O+")) {
        if (OPbags) bagArray[6].classList.add("bad-blood");
    } else {
        if (OPbags) bagArray[6].classList.add("good-blood");
    }
    if (isBadBloodType("O-")) {
        if (OMbags) bagArray[7].classList.add("bad-blood");
    } else {
        if (OMbags) bagArray[7].classList.add("good-blood");
    }
    console.log("blood bags have been highlighted");
});

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
        console.log(
            "There was an error checking your blood type. If you see this message, please contact me @duckyblair#0001 asap"
        );
    }
}

function pageReady() {
    return new Promise((resolve) => {
        var attemptsToStart = 0;
        let checker = setInterval(() => {
            APbags = document.querySelector(
                "[src='/images/items/732/large.png']"
            );
            AMbags = document.querySelector(
                "[src='/images/items/733/large.png']"
            );
            BPbags = document.querySelector(
                "[src='/images/items/734/large.png']"
            );
            BMbags = document.querySelector(
                "[src='/images/items/735/large.png']"
            );
            ABPbags = document.querySelector(
                "[src='/images/items/736/large.png']"
            );
            ABMbags = document.querySelector(
                "[src='/images/items/737/large.png']"
            );
            OPbags = document.querySelector(
                "[src='/images/items/738/large.png']"
            );
            OMbags = document.querySelector(
                "[src='/images/items/739/large.png']"
            );

            //if your internet is absurdly slow, increase the int below to increase the time before it times out.
            //it really shouldn't take any longer than the default though.
            if (++attemptsToStart === 3000) {
                console.log("took to long to find blood bags, process aborted");
                clearInterval(checker);
            }
            if (
                APbags ||
                AMbags ||
                BPbags ||
                BMbags ||
                ABPbags ||
                ABMbags ||
                OPbags ||
                OMbags
            ) {
                setInterval(() => {
                    resolve(true);
                }, 300);

                return clearInterval(checker);
            }
        });
    });
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
