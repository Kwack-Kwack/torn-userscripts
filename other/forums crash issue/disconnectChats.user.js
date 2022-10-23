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

(async () => {
    console.warn("Script start");
    await new Promise(resolve => {
        const checker = setInterval(() => {
            if(document.querySelector("#chatRoot")) {
                console.log("Chats found! Starting script");
                chatRoot = document.querySelector("#chatRoot");
                clearInterval(checker);
                resolve();
            }
        }, 100);
    });
    try{
        document.querySelector("#chatRoot").parentElement.removeChild(chatRoot)
        // document.body.parentElement.innerHTML = pageHTML;
    } catch(e) {
        console.error("Error thrown", e)
    }
})()

// let pageHTML;