const Discord = require(`discord.js`);
const DiscordButtons = require(`discord-buttons`);

module.exports = {
	name: `message`,

	execute: async (client, message) => {
		if (!message.guild) return;

		message.guild.config = client.db.get(`config.${message.guild.id}`) || {};
		const prefix = message.guild.config.prefix || client.config.prefix;
		if (!message.content.startsWith(prefix) || message.author.bot) {
			if (message.mentions.has(client.user.id)) {
				message.channel.send(client.embed.small(`:wave: | Hi! My prefix in this guild is \`${prefix}\`.`));
			}
			return;
		}

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.find((cmd) => [...(cmd.aliases || []), cmd.name].includes(commandName))) return;
		const command = client.commands.find((cmd) => [...(cmd.aliases || []), cmd.name].includes(commandName));

		if (command.permission) {
			if ((command.permission == `BIT_OWNER` && !client.config.owners.includes(message.author.id)) || !message.member.hasPermission(command.permission)) return message.channel.send(client.embed.small.error(`You don't have permission to perform this command. (\`${command.permission}\`)`));
		}

		if (command.cooldown) {
			if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Discord.Collection());

			const now = Date.now();
			const timestamps = client.cooldowns.get(command.name);
			const cooldownAmount = command.cooldown * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.channel.send(client.embed.small.error(`You can use this command again in **${timeLeft.toFixed(1)}** second${timeLeft < 2 ? `` : `s`}.`));
				}
				setTimeout(() => {
					timestamps.delete(message.author.id);
				}, cooldownAmount);
			}

			timestamps.set(message.author.id, now);
		}

		try {
			client.db.add(`commandsRun`, 1);
			command.execute(client, message, args);
		} catch (error) {
			console.error(error);
			message.channel.send(client.embed.small.error(`There was an error while executing this command.`));
		}
	},
};
