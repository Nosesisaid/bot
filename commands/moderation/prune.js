module.exports = {
	name: 'prune',
  aliases: ['purge'],
  guildOnly: true,
	description: 'Prune up to 99 messages.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Eso no parece un numero.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('Debes poner un numero entre 1 y 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('error!');
		});
	},
};
