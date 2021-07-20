const Canvas = require("canvas");
const fs = require('fs');
const Discord = require('discord.js');
const prefix = '!';
const token = process.env.DISTOKEN;
const slashManager = require('slash-command-discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require("config.json")("./config.json")
client.cooldowns = new Discord.Collection();
 const clientuserid = "851836481190002016"
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log("Se cargo el comando "+command.name)
	}
}

client.once('ready', async function () {
	console.log('Estoy lista como ' + client.user.tag);

});
client.on("warn", async function (f) {
	console.log(f)
})
if (!config) throw "Cambia el nombre de config.example.json a config.json y pon tus datos"
slashManager.post(client)
client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('¡No puedo ejecutar el comano en MD!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('No tienes los permisos');
		}
	}

	if (command.args && !args.length) {
		let reply = `No pusiste los argumentos, ${message.author}!`;

		if (command.usage) {
			reply += `\El uso deberia ser: \`${prefix}${command.name} ${
				command.usage
			}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`Espera ${timeLeft.toFixed(
					1
				)} segundos antes de volver a usar el comando \`${command.name}\` .`
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Hubo un error tratando de ejecutar el comand');
	}
});
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
}
client.on('guildMemberAdd', async function (member) {
	if (isNan(config.bienvenidac)) return 
	console.log(member);
  	const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	context.strokeStyle = '#74037b';
	context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '28px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Bienvenido/a al servidor,', canvas.width / 2.5, canvas.height / 3.5);

	context.font = applyText(canvas, `${member.displayName}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  const canal = client.channels.cache.get(config.bienvenidac)
	canal.send("Bienvenid@ al servidor" + member.toString(), attachment)
	const rolbot = member.guild.roles.cache.get(config.autoroles[1])
	const roluser = member.guild.roles.cache.get(config.autoroles[0])
	if (member.user.bot) {
		member.roles.add(rolbot)
	} else if (!member.user.bot) {
		member.roles.add(roluser)
	}
});

client.on('message', async function (message) {
	if (config.emojis[0].length > 1 || !config.emojis[0]) return
	if (!config.autoreactchannel) return 
	//sistema auto estrella
	if (message.channel.id === config.autoreactchannel) {

		for (let i = 0; i < config.emojis.length; i++) {
			var element = config.emojis[i];
			message.react(element)
			
		}
	}
});


client.login(config.token);
