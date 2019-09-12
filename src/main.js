const express = require('express');
const db = require('./db.js');
const routes = require('./routes.js');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(bodyParser.json())
// console.log('routes  ', routes)

app.get('/', (req,res) =>{res.sendFile(path.resolve('./src/web/home.html'))});

routes(app);
db.initDb(()=>{
	app.listen(4005,()=>{
		console.log('listening on 4005')
	});
})
