// ==UserScript==
// @name         Hospital filters
// @namespace    https://www.torn.com/profiles.php?XID=2190604
// @version      0.1
// @description  An attempt to filter people who have revives disabled.
// @author       Kwack_Kwack [2190604]
// @match        *://www.torn.com/hospitalview.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

//waits for page to load, then loads the button onto the page
pageReady().then(() => {
    console.log("page ready, hospital filters script starting");
    if (document.getElementById("enable") === null && document.getElementById("disable") === null) {
        window.infobox = document.createElement("div");
        window.container = document.getElementsByClassName("msg-info-wrap")[0];
        container.appendChild(infobox);
    }
    disableFilters();
});

//Thanks to Manuito for the following function to use GM_addStyle in PDA.
let GM_addStyle = function (s) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = s;
    document.head.appendChild(style);
};

function enableFilters() {
    infobox.innerHTML =
        '<div class="info-msg-cont green border-round m-top10"><div class="info-msg border-round"><i class="info-icon"></i><div class="delimiter"><div class="msg right-round" tabindex="0"><p><button id="disable" type="button" class="torn-btn">Disable revive filter</button></p></div></div></div></div>';
    console.log("enabling filters");
    document
        .getElementById("disable")
        .addEventListener("click", disableFilters);
    var revivesDisabledRows = [];
    for (
        var i = 0;
        i < document.getElementsByClassName("reviveNotAvailable").length;
        i++
    ) {
        revivesDisabledRows[i] =
            document.getElementsByClassName("reviveNotAvailable")[
                i
            ].parentElement;
    }
    try {
        Array.from(revivesDisabledRows).forEach((i) =>
            i.classList.add("filtered-row")
        );
    } catch (error) {
        console.log(
            error + "\n This error was thrown when adding filtered-row class"
        );
    }
}
function disableFilters() {
    infobox.innerHTML =
        '<div class="info-msg-cont red border-round m-top10"><div class="info-msg border-round"><i class="info-icon"></i><div class="delimiter"><div class="msg right-round" tabindex="0"><p><button id="enable" type="button" class="torn-btn">Enable revive filter</button></p></div></div></div></div>';
    console.log("disabling filters");
    document.getElementById("enable").addEventListener("click", enableFilters);
    try {
        Array.from(document.getElementsByClassName("filtered-row")).forEach(
            (i) => i.classList.remove("filtered-row")
        );
    } catch (error) {
        console.log(
            error + "\n This error was thrown when removing filtered-row class"
        );
    }
}

//Modified from the Custom Gym Ratios script
function pageReady() {
    return new Promise((resolve) => {
        let checker = setInterval(() => {
            if (
                document.getElementsByClassName("msg right-round").length != 0
            ) {
                setInterval(() => {
                    resolve(true);
                }, 300);
                return clearInterval(checker);
            }
        });
    });
}
//creates a new class "filtered-row", which just hides the row of the element
var styles = `
.filtered-row {
    display: none !important
}
`;
GM_addStyle(styles);