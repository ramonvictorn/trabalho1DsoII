const express = require('express');
const db = require('./db.js');
const routes = require('./routes.js');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
// console.log('routes  ', routes)
routes(app);
db.initDb(()=>{
	app.listen(4005,()=>{
		console.log('listening on 4005')
	});
})
