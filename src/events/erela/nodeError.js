const { magenta, white } = require('chalk');

module.exports = {
	name: 'nodeError',
	execute(node, error) {
		console.log(
			`${magenta('Lavalink')} ${white(
				`· Node "${node.options.identifier}" has encountered an error: ${error.message}.`,
			)}`,
		);
	},
};
