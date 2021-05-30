module.exports = {
	name: `commands-run`,
	aliases: [`commandsrun`, `cmds-run`, `cmdsrun`],
	description: `See how many commands have been run by the bot.`,

	execute: async (client, message, args) => {
		message.channel.send(client.embed.small(`ℹ️ | **${client.db.get(`commandsRun`).toLocaleString(`en-US`)}** commands have been run so far.`));
	},
};
