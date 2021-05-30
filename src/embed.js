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

module.exports.small.error = (embed) => {
	const embedData = typeof embed == `string` ? { description: `❌ | ${embed}` } : embed;
	if (!embedData.color) embedData.color = config.embed.color;
	return new Discord.MessageEmbed(embedData);
};

module.exports.small.success = (embed) => {
	const embedData = typeof embed == `string` ? { description: `✅ | ${embed}` } : embed;
	if (!embedData.color) embedData.color = config.embed.color;
	return new Discord.MessageEmbed(embedData);
};
