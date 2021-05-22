module.exports = {
	name: `ping`,
	description: `Ping!`,

	execute: async (client, message, args) => {
		const msg = await message.channel.send(client.embed.small(`🏓 | Pong! (0ms)`));
		msg.edit(client.embed.small(`🏓 | Pong! (${Date.now() - msg.createdAt}ms)`));
	},
};
