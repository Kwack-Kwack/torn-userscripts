// ==UserScript==
// @name         PDA TESTING SCRIPT
// @namespace    https://github.com/Kwack-Kwack/torn-userscripts/tree/main/other/PDA_TESTING_SCRIPT/
// @version      0.1
// @description  Downloads the script from the url below and evaluates it
// @author       Kwack [2190604]
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==

//PLEASE NOTE - THIS SCRIPT SHOULD ONLY BE FOR TESTING. Read the README

let url = ""; //insert the url for your script here.

(async () => {
    let apiKey = "###PDA-APIKEY###" //comment out this line if not needed
    let response;
    try {
        response = await PDA_httpGet(url).then((r) => r.responseText);
    } catch (e) {
        console.error("Error thrown during testing script fetch", e);
    }

    try {
        await PDA_evaluateJavascript(response)
    } catch(e) {
        console.error("Error thrown whilst evaluating linked file", e)
    }

    console.log("test script fulfilled")
})();