module.exports = {
	name: `reset-money`,
	aliases: [`resetmoney`],
	description: `Reset someone's money.`,
	permission: `ADMINISTRATOR`,

	execute: async (client, message, args) => {
		const user = message.mentions.members.first()?.user;
		if (!user) return message.channel.send(client.embed.small.error(`Invalid arguments. (\`${message.content.split(` `)[0]} <user>\`)`));

		client.db.eco.reset(message.guild.id, user.id);

		message.channel.send(client.embed.small.success(`Reset ${user}'s economy.`));
	},
};
