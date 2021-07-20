module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
    var tiempo = Date.now() - message.createdTimestamp
		message.channel.send(`El mensaje tiene un ping de ${tiempo}ms`);
	},
};
