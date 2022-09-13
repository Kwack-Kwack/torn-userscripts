/// ==UserScript==
// @name         Block Pandora in chat
// @namespace    https://github.com/itsBlair-hide/torn-userscripts
// @version      0.1
// @description  Deletes all messages posted by Pandora [1541749]
// @author       Kwack [2190604]
// @match        *://*.torn.com/*
// @updateURL   https://github.com/itsBlair-hide/torn-userscripts/raw/main/chatBlockPandora.user.js
// ==/UserScript==


let chatRoot;
let pandoraMessages;
let deleter;
let GM_addStyle = function (s) {
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = s;
    document.head.appendChild(style);
};


pageReady().then(() => {
    deleter = setInterval(() => {
        pandoraMessages = chatRoot.querySelectorAll(
            "[href='/profiles.php?XID=1541749'"
        );

        Array.from(pandoraMessages).forEach((msg) => {
            msg.parentElement.classList.add("stfu");
        });
    });
});

async function pageReady() {
    return new Promise(resolve => {
        let checker = setInterval(() => {
            if (document.querySelector("#chatRoot")) {
                chatRoot = document.querySelector("#chatRoot");
                console.log("Chat root found! Starting script now...");
                clearInterval(checker);
                resolve()
            }
        });
    })
}

var styles = `
.stfu {
    display: none !important
}
`;

GM_addStyle(styles);

function stopHiding() {
    clearInterval(checker);
    clearInterval(deleter);

    [...document.querySelectorAll(".stfu")].forEach((msg) => {
        msg.classList.remove("stfu")
    })
}