module.exports = {
	name: `reset-economy`,
	aliases: [`reseteconomy`, `reset-eco`, `reseteco`],
	description: `Reset the entire server's economy.`,
	permission: `ADMINISTRATOR`,

	execute: async (client, message, args) => {
		message.channel.send({
			embed: client.embed.small(`❓ | Are you sure you want to reset this **entire server's economy**?`),
			buttons: [new client.button.new({ id: client.button.id(`reset-economy`, message, `yes`), style: `red`, label: `Yes` }), new client.button.new({ id: client.button.id(`reset-economy`, message, `no`), style: `gray`, label: `No` })],
		});

		client.on(client.button.event(`reset-economy`, message), (button, member, option) => {
			client.removeAllListeners(client.button.event(`reset-economy`, message));
			button.defer();
			if (option == `no`) return button.message.edit({ embed: client.embed.small.error(`Action canceled.`), buttons: [] });

			client.db.eco.reset(message.guild.id);
			button.message.edit({ embed: client.embed.small.success(`Successfully reset this server's economy.`), buttons: [] });
		});
	},
};
