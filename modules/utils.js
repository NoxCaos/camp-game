module.exports = {
	colors: {
	    red: 14356753,
	    yellow: 16756480,
	    green: 1030733,
	    blue: 1420012,
	    grey: 3553598,
	    default: 2067276
	},

	embed(color, message, title) {
		return { 
			title: title,
			description: message,
			color: color
		};
	},

	f(user, msg) {
		return `**${user}**, ${msg}`;
	},

	getDrain(dateStart) {
		let diff = new Date() - dateStart;
		return diff * .0000001;
	}
}