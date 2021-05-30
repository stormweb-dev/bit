module.exports = {
	name: `pay`,
	description: `Pay someone some of your money.`,

	execute: async (client, message, args) => {
		const user = message.mentions.members.first()?.user;
		if (!user || args.length < 2 || ((isNaN(args[1]) || parseInt(args[1]) < 1) && args[1]?.toLowerCase() != `all`)) return message.channel.send(client.embed.small.error(`Invalid arguments. (\`${message.content.split(` `)[0]} <user> <amount>\`)`));

		if (args[1].toLowerCase() != `all` && args[1] > client.db.eco.get(message.guild.id, message.author.id, `wallet`)) return message.channel.send(client.embed.small.error(`You do not have that much money in your wallet.`));

		client.db.eco.add(message.guild.id, user.id, args[1].toLowerCase() == `all` ? client.db.eco.get(message.guild.id, message.author.id, `wallet`) : args[1], `wallet`);
		client.db.eco.remove(message.guild.id, message.author.id, args[1].toLowerCase() == `all` ? client.db.eco.get(message.guild.id, message.author.id, `wallet`) : args[1], `wallet`);

		message.channel.send(client.embed.small.success(`You gave ${user} **${args[1].toLowerCase()}** of your money.`));
	},
};
