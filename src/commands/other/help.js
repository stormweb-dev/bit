module.exports = {
	name: `help`,
	description: `Help on how to use the bot!`,

	execute: async (client, message, args) => {
		var categories = [
			{ name: `Economy`, emoji: `🪙` },
			{ name: `Admin`, emoji: `⛔` },
			{ name: `Other`, emoji: `🔎` },
		];

		if (!args[0] || !client.commands.find((cmd) => [...(cmd.aliases || []), cmd.name].includes(args[0])))
			return message.channel.send(
				client.embed({
					title: `❓ | Help Menu`,
					description: `These are all of Bit's commands. Do \`${message.guild.config.prefix || client.config.prefix}help [command]\` for more information on a specific command. Join the [support server](https://discord.gg/wrrqxEACqF) for extra help.\n\n${categories
						.map((cat) => {
							return `**${cat.emoji} | ${cat.name}**\n${client.commands
								.filter((cmd) => cmd.category == cat.name.toLowerCase())
								.map((cmd) => {
									return `\`${cmd.name}\``;
								})
								.join(`, `)}`;
						})
						.join(`\n\n`)}`,
				})
			);

		const command = client.commands.find((cmd) => [...(cmd.aliases || []), cmd.name].includes(args[0]));

		message.channel.send(
			client.embed({
				title: `❓ | Help Menu (${message.guild.config.prefix || client.config.prefix}${command.name})`,
				fields: [
					{ name: `Name`, value: `\`${command.name}\``, inline: true },
					{
						name: `Aliases`,
						value: command.aliases
							? command.aliases
									.map((alias) => {
										return `\`${alias}\``;
									})
									.join(`, `)
							: `none.`,
						inline: true,
					},
					{ name: `Category`, value: `\`${command.category}\``, inline: true },
					{ name: `Description`, value: command.description },
				],
			})
		);
	},
};
