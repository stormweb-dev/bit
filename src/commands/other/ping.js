module.exports = {
	name: `ping`,
	description: `Ping!`,

	execute: async (client, message, args) => {
		message.channel.send(client.embed.small(`🏓 | Pong! *(API Latency: \`${client.ws.ping}ms\`)*`));
	},
};
