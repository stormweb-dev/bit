module.exports = {
	name: `message`,

	execute: async (client, message) => {
		const prefix = client.config.prefix;
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		if (!client.commands.has(command)) return;

		try {
			client.commands.get(command).execute(client, message, args);
		} catch (error) {
			console.error(error);
			message.channel.send(client.embed.error());
		}
	},
};
