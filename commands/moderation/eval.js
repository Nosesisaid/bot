module.export = {
    name: "eval",
    description: "Comando de desarrollo.",
    args: true,
    guidOnly: true,
    execute(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return 
        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        if (message.author.id !== '688476559019212805') return message.channel.send('necesitas los permisos de developer')
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    } 
        
}