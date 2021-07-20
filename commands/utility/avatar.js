const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	execute(message) {
		if (!message.mentions.users.size) {
      var embedtu = new MessageEmbed()
      .setImage(message.author.displayAvatarURL({ dynamic: true, size: 2048}))
			return message.channel.send(embedtu)
		}

			const avaterembed = new MessageEmbed()
      .setImage(message.mentions.users.first().displayAvatarURL({ dynamic: true, size: 2048 }))
      
		

		message.channel.send(avaterembed);
  }
};
