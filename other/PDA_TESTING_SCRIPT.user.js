// ==UserScript==
// @name         PDA TESTING SCRIPT
// @namespace    https://github.com/Kwack-Kwack/torn-userscripts/tree/main/other
// @version      0.1
// @description  Downloads the script from the url below and evaluates it
// @author       Kwack [2190604]
// @match        *://www.torn.com/*
// ==/UserScript==

let url = "";

let response = await PDA_httpGet(url).then(r => r.responseText);

console.log(`Script requested at ${url} contains the following code:`)
console.log(response)

// await PDA_evaluateJavascript(response)