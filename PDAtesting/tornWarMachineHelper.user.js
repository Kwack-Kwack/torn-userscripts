// ==UserScript==
// @name         Torn: War Machine Helper
// @namespace    http://tampermonkey.net/
// @version      1.3.2
// @description  Show finishing hits on items page
// @author       Untouchable [1360035]
// @match        https://www.torn.com/item.php
// @grant        none
// ==/UserScript==

//below is for PDAtesting



const colors = true; // Grey out completed categories
const open_by_default = true; // Open tab by default
let active;

if (open_by_default) {
    active = "active";
}

let cssStr = (`
    table {
    table-layout:fixed;
    width:100%;
    }

    #finishing_hits > tbody > tr > td {
    padding:5px
    }

    /*
    table, td {
    border: 1px solid black;
    border-collapse: collapse;
    } */

    td {
    width: 16.6%
    }

    .incomplete {

    }

    .complete {
    color: #d3d3d3;
    }

    `);

(function () {
    "use strict";
    if (!document.URL.includes("torn.com/item.php")) {
        console.error("Page isn't an items page!");
        return;
    }
    console.warn("Page is an items page, script starting");
    GM_addStyle(cssStr)
    let apiKey = getApiKey();

    fetch("https://api.torn.com/user/?selections=personalstats&key=" + apiKey)
        .then((response) => response.json())
        .then((data) => {
            let ps = data.personalstats;
            let seasons = ["summer", "winter", "spring", "autumn"],
                hr = "";

            seasons.forEach((sn) => {
                if (
                    $(
                        `#mainContainer > div.content-wrapper.${sn} > div.main-items-cont-wrap > hr`
                    )[0] != undefined
                ) {
                    hr = `#mainContainer > div.content-wrapper.${sn} > div.main-items-cont-wrap > hr`;
                }
            });

            let hits_req = getHitsReq(data.personalstats);

            JQAfter(
                hr,
                `
                    <div id="finishing-hits-title" class="title-black title-toggle ${active}" role="heading" aria-level="5">
                    <div class="arrow-999 right"></div>
                    War Machine - ${hits_req}
                    <div class="clear"></div>
                    </div>

                    <div class="cont-gray bottom-round content" style="padding:5px">
                    <table id="finishing_hits">
                        <tr>
                        <td class="` +
                    getStatus(ps.heahits) +
                    `" title="RPG / Flamethrower">Heavy Artillery: </td>
                        <td class="` +
                    getStatus(ps.heahits) +
                    `">${nwc(ps.heahits)}</td>
                        <td class="` +
                    getStatus(ps.machits) +
                    `" title="Rheinmetall MG3 / Minigun">Machine Guns: </td>
                        <td class="` +
                    getStatus(ps.machits) +
                    `">${nwc(ps.machits)}</td>
                        <td class="` +
                    getStatus(ps.rifhits) +
                    `" title="ArmaLite M-15A4 Rifle / Gold Plated AK-47">Rifles: </td>
                        <td class="` +
                    getStatus(ps.rifhits) +
                    `">${nwc(ps.rifhits)}</td>
                        </tr>
                        <tr>
                        <td class="` +
                    getStatus(ps.smghits) +
                    `" title="Dual SMG / BTMP9">Sub Machine Guns: </td>
                        <td class="` +
                    getStatus(ps.smghits) +
                    `">${nwc(ps.smghits)}</td>
                        <td class="` +
                    getStatus(ps.shohits) +
                    `" title="Jackhammer">Shotguns: </td>
                        <td class="` +
                    getStatus(ps.shohits) +
                    `">${nwc(ps.shohits)}</td>
                        <td class="` +
                    getStatus(ps.pishits) +
                    `" title="Qsz-92">Pistols: </td>
                        <td class="` +
                    getStatus(ps.pishits) +
                    `">${nwc(ps.pishits)}</td>
                        </tr>
                        <tr>
                        <td class="` +
                    getStatus(ps.grehits) +
                    `" title="Nail Bomb / HEG">Temporary Weapons: </td>
                        <td class="` +
                    getStatus(ps.grehits) +
                    `">${nwc(ps.grehits)}</td>
                        <td class="` +
                    getStatus(ps.piehits) +
                    `" title="Macana / Diamond Bladed Knife">Piercing Weapons: </td>
                        <td class="` +
                    getStatus(ps.piehits) +
                    `">${nwc(ps.piehits)}</td>
                        <td class="` +
                    getStatus(ps.slahits) +
                    `" title="Kodachi Swords">Slashing Weapons: </td>
                        <td class="` +
                    getStatus(ps.slahits) +
                    `">${nwc(ps.slahits)}</td>
                        </tr>
                        <tr>
                        <td class="` +
                    getStatus(ps.axehits) +
                    `" title="Handbag / Metal Nunchucks">Clubbing Weapons: </td>
                        <td class="` +
                    getStatus(ps.axehits) +
                    `">${nwc(ps.axehits)}</td>
                        <td class="` +
                    getStatus(ps.chahits) +
                    `" title="Taser">Mechanical Weapons: </td>
                        <td class="` +
                    getStatus(ps.chahits) +
                    `">${nwc(ps.chahits)}</td>
                        <td class="` +
                    getStatus(ps.h2hhits) +
                    `" title="Kick">Hand-to-Hand: </td>
                        <td class="` +
                    getStatus(ps.h2hhits) +
                    `">${nwc(ps.h2hhits)}</td>
                        </tr>
                    </table>
                    </div>
                    <br>
                `
            );
        });
})();

function JQAfter(elem, htmlStr) {
    const newElem = document.createElement("div");
    newElem.className = "WarMachineHelper";
    newElem.innerHTML = htmlStr;
    elem.parentNode.insertBefore(newElem, elem.nextElementSibling);
}

function getApiKey() {
    let apiKey = this.apiKey
    console.log(apiKey)
    if (apiKey) {
        PDAmode = true;
        return apiKey;
    }
    apiKey = localStorage.getItem("uapikey");
    if (apiKey === null) {
        apiKey = "";
        while (apiKey !== null && apiKey.length != 16) {
            apiKey = prompt("Please enter a valid Torn API key");
        }
        if (apiKey !== null && apiKey.length == 16) {
            localStorage.setItem("uapikey", apiKey);
        }
    }
    return apiKey;
}

//////////////////////////////////////////////////////////////////////////////////////////

function GM_addStyle(cssStr) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = s;
    document.head.appendChild(style)
}

//////////////////////////////////////////////////////////////////////////////////////////

function getHitsReq(stats) {
    let hitsReq = 0;
    let categories = 0;

    if (stats.heahits < 1000) {
        hitsReq = hitsReq + (1000 - stats.heahits);
        categories++;
    }

    if (stats.machits < 1000) {
        hitsReq = hitsReq + (1000 - stats.machits);
        categories++;
    }

    if (stats.rifhits < 1000) {
        hitsReq = hitsReq + (1000 - stats.rifhits);
        categories++;
    }

    if (stats.smghits < 1000) {
        hitsReq = hitsReq + (1000 - stats.smghits);
        categories++;
    }

    if (stats.shohits < 1000) {
        hitsReq = hitsReq + (1000 - stats.shohits);
        categories++;
    }

    if (stats.pishits < 1000) {
        hitsReq = hitsReq + (1000 - stats.pishits);
        categories++;
    }

    if (stats.grehits < 1000) {
        hitsReq = hitsReq + (1000 - stats.grehits);
        categories++;
    }

    if (stats.piehits < 1000) {
        hitsReq = hitsReq + (1000 - stats.piehits);
        categories++;
    }

    if (stats.slahits < 1000) {
        hitsReq = hitsReq + (1000 - stats.slahits);
        categories++;
    }

    if (stats.axehits < 1000) {
        hitsReq = hitsReq + (1000 - stats.axehits);
        categories++;
    }

    if (stats.chahits < 1000) {
        hitsReq = hitsReq + (1000 - stats.chahits);
        categories++;
    }

    if (stats.h2hhits < 1000) {
        hitsReq = hitsReq + (1000 - stats.h2hhits);
        categories++;
    }

    let ret = nwc(hitsReq) + " hits required in " + categories + " categories";

    return ret;
}

//////////////////////////////////////////////////////////////////////////////////////////

function nwc(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//////////////////////////////////////////////////////////////////////////////////////////

function getStatus(hits) {
    if (!colors) {
        return "";
    }

    if (hits >= 1000) {
        return "complete";
    } else {
        return "incomplete";
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
