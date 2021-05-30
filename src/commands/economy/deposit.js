module.exports = {
	name: `deposit`,
	aliases: [`dep`],
	description: `Deposit some of your money to your bank.`,

	execute: async (client, message, args) => {
		if (args.length < 1 || ((isNaN(args[0]) || parseInt(args[0]) < 1) && args[0]?.toLowerCase() != `all`)) return message.channel.send(client.embed.small.error(`Invalid arguments. (\`${message.content.split(` `)[0]} <amount>\`)`));

		if (args[0].toLowerCase() != `all` && args[0] > client.db.eco.get(message.guild.id, message.author.id, `wallet`)) return message.channel.send(client.embed.small.error(`You do not have that much money in your wallet.`));

		client.db.eco.add(message.guild.id, message.author.id, args[0].toLowerCase() == `all` ? client.db.eco.get(message.guild.id, message.author.id, `wallet`) : args[0], `bank`);
		client.db.eco.remove(message.guild.id, message.author.id, args[0].toLowerCase() == `all` ? client.db.eco.get(message.guild.id, message.author.id, `wallet`) : args[0], `wallet`);

		message.channel.send(client.embed.small.success(`You deposited **${args[0].toLowerCase()}** of your money to your bank.`));
	},
};
