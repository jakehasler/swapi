var express = require('express');
var router = express.Router();

/* GET Some JSON Data */
router.get('/', function(req, res, next) {
	var obj = {
		title: 'Jakespress',
		description: 'API Route for Jakespress'
	};

	res.send(obj);
});

module.exports = router;
