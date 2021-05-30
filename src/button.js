const Buttons = require(`discord-buttons`);
const config = require(`./config`);

Buttons.new = Buttons.MessageButton;

Buttons.id = (command, message, option) => {
	return `${command}_${message.author.id}_${message.createdTimestamp}_${option}`;
};

Buttons.event = (command, message) => {
	return `button-${command}_${message.author.id}_${message.createdTimestamp}`;
};

module.exports = Buttons;
