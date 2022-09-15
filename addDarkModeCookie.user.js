// ==UserScript==
// @name         Automatically Enable Dark Mode
// @namespace    https://github.com/itsBlair-hide/torn-userscripts 
// @version      0.1
// @description  Adds a cookie for torn to enable dark mode on launch.
// @author       Kwack [2190604]
// @match        https://*.torn.com/*
// @grant        none
// ==/UserScript==

setCookie("darkModeEnabled", true);