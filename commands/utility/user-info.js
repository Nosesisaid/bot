const { MessageEmbed } = require("discord.js")
module.exports = {
	name: 'user-info',
  aliases: ['userinfo'],
	description: 'Información tuya o de otro usuario.',
	execute(message) {
		const usuario = message.mentions.users.first() || message.author
		const infoe = new MessageEmbed()
			.setTitle("Información de " + usuario.tag)
			.setColor("RANDOM")
			.addField("Creación de la cuenta", usuario.createdAt.toString(), true)
			.addField("Tag", usuario.tag, true)
			.addField("ID", usuario.id, true)
			.addField("Avatar URL", `[URL](${usuario.displayAvatarURL({ dynamic: true })})`)
			.setThumbnail(usuario.displayAvatarURL())
			.setTimestamp(new Date())
		
		

		message.channel.send(infoe);
	},
};
