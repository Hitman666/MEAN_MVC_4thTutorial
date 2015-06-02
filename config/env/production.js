var port = 1337;

module.exports = {
	port: port,
	db: 'mongodb://localhost/todos',
	facebook: {
		clientID: '1671331279763296',
		clientSecret: '4e5ad533fc982e29ac55f87cae6e1484',
		callbackURL: 'http://meantodo.com/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'wYilkwNnzhikd7dkdbmU9a34I',
		clientSecret: 'l766h2tbK1sBhbjfnm4xc089MyrfVFgj8kBSEVrY5ONhrYgxj8',
		callbackURL: 'http://meantodo.com/oauth/twitter/callback'
	}
};
