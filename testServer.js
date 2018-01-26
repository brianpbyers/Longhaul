const express = require('express');
const app = express();
var mongo = require('mongodb').MongoClient;
var dburl = ('mongodb://localhost:27017/RTDData');
app.get('/position', (req, res)=>{
	console.log('hit new get route');
	mongo.connect(dburl, (err, db)=>{
		db.db('RTDData').collection('position').find({}).toArray((err, positions)=>{
			res.send(positions);
		});
	});
});

app.get('/update', (req, res)=>{
	console.log('hit new get route');
	mongo.connect(dburl, (err, db)=>{
		db.db('RTDData').collection('update').find({}).toArray((err, positions)=>{
			res.send(positions);
		});
	});
});

app.get('/*', (req, res)=>{
	res.send('You probably want to head over to /update or /position');
});

app.listen(process.env.PORT || 3000, ()=>{
	console.log("Potato Server is running on port", process.env.port || 3000);
});
