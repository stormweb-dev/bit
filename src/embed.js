const Discord = require(`discord.js`);
const config = require(`./config`);

module.exports = (embed) => {
	const embedData = embed;
	if (!embedData.footer) embedData.footer = config.embed.footer;
	if (!embedData.color) embedData.color = config.embed.color;
	return new Discord.MessageEmbed(embedData);
};

module.exports.small = (embed) => {
	const embedData = typeof embed == `string` ? { description: embed } : embed;
	if (!embedData.color) embedData.color = config.embed.color;
	return new Discord.MessageEmbed(embedData);
};

module.exports.error = (small = false) => {
	const embedData = { color: config.embed.color, description: `:x: | There was an error while executing this command.` };
	if (!small) embedData.footer = `If this error persists, please contact the owner.`;
	return new Discord.MessageEmbed(embedData);
};
