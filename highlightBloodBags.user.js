// ==UserScript==
// @name         Blood Bag Highlights
// @namespace    https://www.torn.com/profiles.php?XID=2190604 
// @version      0.1
// @description  Adds colours to the torn item's page to show good vs bad blood types
// @author       Kwack_Kwack [2190604]
// @match        *://www.torn.com/item.php*
// @grant        GM_addStyle
// ==/UserScript==

var yourType = "O-" //insert AB+, AB-, A+, A-, B+, B-, O+, or O-
pageReady().then(() => {
    console.log("page ready, blood bag highlights script starting");
    console.log("Your blood type is " + yourType)
    var [APbags, AMbags, ABPbags, ABMbags, BPbags, BMbags, OPbags, OMbags] = [document.querySelector("[src='/images/items/732/large.png']"), document.querySelector("[src='/images/items/733/large.png']"), document.querySelector("[src='/images/items/736/large.png']"), document.querySelector("[src='/images/items/737/large.png']"), document.querySelector("[src='/images/items/734/large.png']"), document.querySelector("[src='/images/items/735/large.png']"), document.querySelector("[src='/images/items/738/large.png']"), document.querySelector("[src='/images/items/739/large.png']")]
    for (var i = 0; i < 3; i++) {
        [APbags, AMbags, ABPbags, ABMbags, BPbags, BMbags, OPbags, OMbags] = [APbags.parentNode, AMbags.parentNode, ABPbags.parentNode, ABMbags.parentNode, BPbags.parentNode, BMbags.parentNode, OPbags.parentNode, OMbags.parentNode]
    }
    if(isBadBloodType("A+")) {
        APbags.classList.add("bad-blood")
    } else {
        APbags.classList.add("good-blood")
    }
    if(isBadBloodType("A-")) {
        AMbags.classList.add("bad-blood")
    } else {
        AMbags.classList.add("good-blood")
    }
    if(isBadBloodType("B+")) {
        BPbags.classList.add("bad-blood")
    } else {
        BPbags.classList.add("good-blood")
    }
    if(isBadBloodType("B-")) {
        BMbags.classList.add("bad-blood")
    } else {
        BMbags.classList.add("good-blood")
    }
    if(isBadBloodType("AB+")) {
        ABPbags.classList.add("bad-blood")
    } else {
        ABPbags.classList.add("good-blood")
    }
    if(isBadBloodType("AB-")) {
        ABMbags.classList.add("bad-blood")
    } else {
        ABMbags.classList.add("good-blood")
    }
    if(isBadBloodType("O+")) {
        OPbags.classList.add("bad-blood")
    } else {
        OPbags.classList.add("good-blood")
    }
    if(isBadBloodType("O-")) {
        OMbags.classList.add("bad-blood")
    } else {
        OMbags.classList.add("good-blood")
    }
    
})
let GM_addStyle = function (s) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = s;
    document.head.appendChild(style);
};

function isBadBloodType(type) {
    if(yourType == "AB+") {
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
        return type != "O-"
    } else {
        alert = document.createElement("div")
        container = document.getElementsByClassName("equipped-items-wrap")[0]
        console.log(container)
        container.appendChild(alert)
        alert.innerHTML = '<div class="info-msg-cont red border-round m-top10"><div class="info-msg border-round"><i class="info-icon"></i><div class="delimiter"><div class="msg right-round" tabindex="0"><p>Your currently selected blood type is not selected. Please go to the script and edit your blood type to be one of the options.<br> - Highlight Blood Bags userscript</p></div></div></div></div>'
        return "Error, yourType is not a confirmed blood type. Please select O+, O-, A+, A-, AB+, AB-, B+ or B-.";
    }
}

function pageReady() {
    return new Promise((resolve) => {
        let checker = setInterval(() => {
            if (document.querySelector("[src='/images/items/732/large.png']"), document.querySelector("[src='/images/items/733/large.png']"), document.querySelector("[src='/images/items/736/large.png']"), document.querySelector("[src='/images/items/737/large.png']"), document.querySelector("[src='/images/items/734/large.png']"), document.querySelector("[src='/images/items/735/large.png']"), document.querySelector("[src='/images/items/738/large.png']"), document.querySelector("[src='/images/items/739/large.png']")) {
                setInterval(() => {
                    resolve(true);
                }, 300);
                return clearInterval(checker);
            }
        });
    });
}

var styles = `
.good-blood {
    background-color: var(--default-bg-green-hover-color) !important;
}
.bad-blood {
    background-color: var(--default-bg-red-hover-color) !important;
}
`
GM_addStyle(styles)