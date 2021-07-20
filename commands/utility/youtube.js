const Discord = require("discord.js")
const { DiscordTogether } = require('discord-together');
module.exports = {
    name: "youtube",
    description: "Comando para conseguir una invite de youtube together",
    aliases: ["yt"],
    async execute(message, client) {
        client.discordTogether = new DiscordTogether(client)
        var canalvc = message.member.voice.channel
        if (!canalvc) return message.channel.send("Conectate a un canal de voz")
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
            const embedinvite = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`[Pulsame para entrar a youtube](${invite.code})`)
            .setTitle("Youtube")
            return message.channel.send(embedinvite)
        })

    }
}