module.exports = {
	name: `add-money`,
	aliases: [`addmoney`, `give-money`, `givemoney`],
	description: `Give money to someone.`,
	permission: `ADMINISTRATOR`,

	execute: async (client, message, args) => {
		const user = message.mentions.members.first()?.user;
		if (!user || args.length < 2 || isNaN(args[1]) || parseInt(args[1]) < 1 || (args[2] && ![`wallet`, `bank`].includes(args[2]))) return message.channel.send(client.embed.small.error(`Invalid arguments. (\`${message.content.split(` `)[0]} <user> <amount> [wallet|bank]\`)`));

		client.db.eco.add(message.guild.id, user.id, args[1], args[2] || `wallet`);

		message.channel.send(client.embed.small.success(`Added **${args[1]}** to ${user}'s ${args[2] || `wallet`}.`));
	},
};
