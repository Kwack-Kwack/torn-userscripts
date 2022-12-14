// ==UserScript==
// @name         Disconnect-chats
// @namespace    https://github.com/itsBlair-hide/torn-userscripts
// @version      0.1
// @description  Disconnects all in-game chats, potential fix to https://www.torn.com/forums.php#/p=threads&f=19&t=16187619&b=0&a=0
// @author       Kwack [2190604]
// @match        https://www.torn.com/forums.php*
// @grant        none
// ==/UserScript==

let chat;
let removeElem = (...elems) => {
    for (let elem of elems) {
        try {
            document
                .querySelector(elem)
                .parentElement.removeChild(document.querySelector(elem));
        } catch (e) {
            console.error(e, elem);
        }
    }
};

(async () => {
    console.warn("Script start");
    // await new Promise((resolve) => {
    //     const checker = setInterval(() => {
    //         if (document.querySelector("#chatRoot")) {
    //             console.log("Chats found! Starting script");
    //             chatRoot = document.querySelector("#chatRoot");
    //             clearInterval(checker);
    //             resolve();
    //         }
    //     }, 100);
    // });
    try {
        // removeElem("#chatRoot", "script[src*='chats.min.js']", "#gtm_tag", "script[src*='editor.build.js']", "script[src*='tinymce.js']", "script[src*='tinymce.option.js']", "script[src*='forums_sidebar.js']", "script[src*='n_mvc_forums.js']");
        // // document.body.parentElement.innerHTML = pageHTML;
        // console.log("done!")
        // return true;
        document.addEventListener("error", (e) => {
            console.error("message:", e.message);
            console.error("name:", e.name);
            console.error("stack:", e.stack);
        });
    } catch (e) {
        console.error("Error thrown", e);
    }
})();

// let pageHTML;
