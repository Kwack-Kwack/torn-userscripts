const response = await PDA_httpGet("https://api.torn.com/key/?selections=info&key=WjPLZilBhEcALpLh").then(r => r.json())

console.log(response)
