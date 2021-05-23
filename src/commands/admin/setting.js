module.exports = {
	name: `setting`,
	description: `Manage server settings.`,
	permission: `ADMINISTRATOR`,

	execute: async (client, message, args) => {
		const subcmds = [`prefix`];

		if (!args[0] || !subcmds.includes(args[0].toLowerCase())) return message.channel.send(client.embed.small.error(`Invalid subcommand. *\`${subcmds.join(`\`, \``)}\`*`));

		switch (args[0].toLowerCase()) {
			case `prefix`:
				if (!args[1]) return message.channel.send(client.embed.small.error(`Please specify a new prefix.`));
				client.db.set(`config.${message.guild.id}.prefix`, args.slice(1).join(` `));
				return message.channel.send(client.embed.small(`Prefix changed to \`${args.slice(1).join(` `)}\`.`));
				break;
		}
	},
};
