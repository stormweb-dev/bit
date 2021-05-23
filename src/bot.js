const Discord = require(`discord.js`);
const fs = require(`fs`);

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.config = require(`./config`);
client.embed = require(`./embed`);
client.db = require(`./database`);
client.utils = require(`./utils`);

const eventFiles = fs.readdirSync(`./src/events`).filter((f) => f.endsWith(`.js`));
eventFiles.forEach((file) => {
	const event = require(`./events/${file}`);
	client[`on${event.once ? `ce` : ``}`](event.name, (...args) => event.execute(client, ...args));
});

const commandFolders = fs.readdirSync(`./src/commands`);
commandFolders.forEach((folder) => {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((f) => f.endsWith(`.js`));
	commandFiles.forEach((file) => {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	});
});

client.login(require(`./token`));
