const fumo = require("fumo-api")
module.exports = {
    name: "fumo",
    description: "Envia una foto de un fumo",
    cooldown: 10,
    execute(message) {
        message.channel.send("Buscando fumos").then(m => {
            fumo().then(url => {
                m.edit(url)
            })
        })

    }
}