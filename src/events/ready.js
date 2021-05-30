module.exports = {
	name: `ready`,
	once: true,

	execute: async (client) => {
		console.log(`Bot ready: ${client.user.tag}`);

		status();
		setInterval(status, 10000);

		async function status() {
			const message = [`Bit`, `Stormweb#5181`, `https://discord.gg/wrrqxEACqF`][Math.floor(Math.random() * 3)];
			const guilds = client.guilds.cache.size;

			client.user.setActivity(`${message} | ${guilds} servers | 1 shard`, { type: `WATCHING` });
		}
	},
};
