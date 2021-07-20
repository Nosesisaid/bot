module.exports = {
	name: 'say',
	description: 'Dice los argumentos.',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(args.join(" "), { allowedMentions: { parse: [] } });
	},
};
