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

		if (!client.commands.find((cmd) => [cmd.name, ...cmd.aliases].includes(commandName))) return;
		const command = client.commands.find((cmd) => [cmd.name, ...cmd.aliases].includes(commandName));

		if (command.permission) {
			if ((command.permission == `BIT_OWNER` && !client.config.owners.includes(message.author.id)) || !message.member.hasPermission(command.permission)) return message.channel.send(client.embed.small.error(`You do not have permission to perform this command.`));
		}

		try {
			command.execute(client, message, args);
		} catch (error) {
			console.error(error);
			message.channel.send(client.embed.small.error(`There was an error while executing this command.`));
		}
	},
};
