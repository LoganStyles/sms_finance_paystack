//mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27107/ctl';

var promise =mongoose.connect(mongoDB,{useMongoClient: true});

promise.then(function(db){

});

//mongoose.connect(mongoDB);
//var db = mongoose.connection;
//db.on('error',console.error.bind(console, 'MongoDB connection error:'));

module.exports = promise;
/*
module.exports = {
	database:"mongodb://localhost:27107/ctl",
	secret:'dig838398OP'
}*/