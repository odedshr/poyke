const sendmail = require('sendmail')();

sendmail(
	{
		from: 'odedshr@gmail.com',
		to: 'odedshr@gmail.com',
		subject: 'test sendmail',
		html: 'Mail of test sendmail '
	},
	function(err, reply) {
		console.log(err && err.stack);
		console.dir(reply);
	}
);
