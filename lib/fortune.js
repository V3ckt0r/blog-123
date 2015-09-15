var fortuneCookies = [
	"Cookies are nice",
	"Vengence is a must",
	"Flow but don't run",
	"Fleeing is smart",
	"There is more than one way to drown",
];

exports.getFortune = function() {
	var idx = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[idx];
};
