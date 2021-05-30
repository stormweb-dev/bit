module.exports = {
	name: `clickButton`,

	execute: async (client, button) => {
		if (button.clicker == null) return;
		if (button.id) {
			var buttonSplit = button.id.split(`_`);
			if (buttonSplit[1] != button.clicker.user.id) return button.defer();
			const option = buttonSplit[3];
			buttonSplit.pop();
			client.emit(`button-${buttonSplit.join(`_`)}`, button, button.clicker, option);
		}
	},
};
