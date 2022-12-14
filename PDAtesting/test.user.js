const response = await fetch("https://api.torn.com/key/?selections=info&key=WjPLZilBhEcALpLh")

console.log(response)

async function fetch(url) {
    const r = await PDA_httpGet("https://api.torn.com/key/?selections=info&key=WjPLZilBhEcALpLh").then(r => r.json());
    return r.json()
}
