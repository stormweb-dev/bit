module.exports = {
	name: `balance`,
	aliases: [`bal`, `money`],
	description: `See your or someone else's balance!`,

	execute: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;

		const wallet = client.db.eco.get(message.guild.id, user.id, `wallet`);
		const bank = client.db.eco.get(message.guild.id, user.id, `bank`);
		const total = wallet + bank;

		message.channel.send(
			client.embed({
				title: `🪙 | Balance`,
				fields: [{ name: user.tag, value: `> Wallet: \`${wallet.toLocaleString(`en-US`)}\`\n> Bank: \`${bank.toLocaleString(`en-US`)}\`\n> **Total:** \`${total.toLocaleString(`en-US`)}\`` }],
				thumbnail: { url: user.displayAvatarURL() },
			})
		);
	},
};
