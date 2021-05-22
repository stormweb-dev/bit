module.exports = {
	name: `ready`,
	once: true,

	execute: async (client) => {
		console.log(`Bot ready: ${client.user.tag}`);
	},
};
