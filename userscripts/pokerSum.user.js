// ==UserScript==
// @name         Poker Sum Userscript
// @namespace    https://github.com/Kwack-Kwack/torn-userscripts
// @version      0.1
// @description  Made for Prox at https://www.torn.com/forums.php#/p=threads&f=67&t=16163506&b=0&a=0&to=22960816
// @author       Kwack [2190604]
// @match        https://www.torn.com/loader.php?sid=viewPokerStats
// @grant        none
// ==/UserScript==

let customAmount = 0; //add custom amount here

let totalGain, totalLoss, legTotalGain, legTotalLoss;

let table = await findYourStats();

findRows();

showCustomTotal();

async function findYourStats() {
    return new Promise((resolve) => {
        let checker = setInterval(() => {
            if (document.querySelector("#your-stats")) {
                clearInterval(checker);
            }
        });
        resolve(document.querySelector("#your-stats"));
    });
}

function findRows() {
    [...table.querySelectorAll(".item")]
        .filter((row) => row.firstElementChild.innerHTML.includes("otal money"))
        .forEach((r) => assignValue(r));
}

function assignValue(r) {
    let value = parseInt(
        r.querySelector(".stat-value").innerHTML.replace(/[$, ]/g, "")
    );
    switch (r.firstElementChild.innerHTML.split("<")[0].replace("\n", "")) {
        case `Total money gain`:
            totalGain = value;
            break;
        case `Total money loss`:
            totalLoss = value;
            break;
        case `Legacy total money won`:
            legTotalGain = value;
            break;
        case `Legacy total money lost`:
            legTotalLoss = value;
            break;
        default:
            console.log(
                r.firstElementChild.innerHTML.split("<")[0].replace("\n", "")
            );
            throw new Error(
                "A different script is interfering with this tool, or it is outdated."
            );
    }
}

async function showCustomTotal() {
    let netTotal =
        customAmount + totalGain + legTotalGain - totalLoss - legTotalLoss;
    let row = document.createElement("li");
    row.innerHTML = `<li>
    <ul class="item">
    <li class="stat">
    Current (custom) net winnings:<span class="m-show">:</span>
    </li>
    <li class="stat-value">
    $${netTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>
    <li class="clear"></li>
    </ul>
    </li>`;

    table.lastElementChild.appendChild(row);
}
