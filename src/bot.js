const Discord = require(`discord.js`);
const DiscordButtons = require(`discord-buttons`);
const fs = require(`fs`);

const client = new Discord.Client();
DiscordButtons(client);
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.config = require(`./config`);
client.embed = require(`./embed`);
client.button = require(`./button`);
client.db = require(`./database`);
client.utils = require(`./utils`);

const eventFiles = fs.readdirSync(`./src/events`).filter((f) => f.endsWith(`.js`));
eventFiles.forEach((file) => {
	const event = require(`./events/${file}`);
	client[`on${event.once ? `ce` : ``}`](event.name, (...args) => event.execute(client, ...args));
	console.log(`Loaded ${event.name} event.`);
});

const commandFolders = fs.readdirSync(`./src/commands`);
commandFolders.forEach((folder) => {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((f) => f.endsWith(`.js`));
	commandFiles.forEach((file) => {
		const command = require(`./commands/${folder}/${file}`);
		command.category = folder;
		client.commands.set(command.name, command);
		console.log(`Loaded ${command.name} command.`);
	});
});

client.login(require(`./token`));

// const Discord = require(`discord.js`);
// const DiscordButtons = require(`discord-buttons`);

// const client = new Discord.Client();
// DiscordButtons(client);

// client.on(`message`, (message) => {
// 	if (message.content === `.test`) {
// 		var button = new DiscordButtons.MessageButton().setID(`test`).setStyle(`red`).setLabel(`wowie`);
// 		message.channel.send(`aaa`, button);
// 	}
// });

// client.login(`ODQ1Njc0NjcwNjk4NzkwOTM0.YKkZ6Q.xWxGHwRuUTNZH99XlqNP1qbhWyQ`);

// client.once(`ready`, () => console.log(`a`));
