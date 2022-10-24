// ==UserScript==
// @name         PDA TESTING SCRIPT
// @namespace    https://github.com/Kwack-Kwack/torn-userscripts/tree/main/other
// @version      0.1
// @description  Downloads the script from the url below and evaluates it
// @author       Kwack [2190604]
// @match        https://www.torn.com/forums.php*
// @grant        none
// ==/UserScript==

let url =
    "https://github.com/Kwack-Kwack/torn-userscripts/raw/main/other/forums%20crash%20issue/test.js";

(async () => {
    console.log("Test log");
    console.log(`URL for testing script: ${url}`);

    let response;
    try {
        response = await PDA_httpGet(url).then((r) => r.responseText);
    } catch (e) {
        console.error("Error thrown during fetch", e);
    }

    await PDA_evaluateJavascript(response)

    console.log("script completed")
})();