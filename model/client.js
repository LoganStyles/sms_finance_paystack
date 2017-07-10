const 
	mongoose = require('mongoose'),
	config = require('../config/database'),

	ClientSchema = mongoose.Schema({		
		fname:{
			type:String,
			max:100,
			required:true
		},
		lname:{
			type:String,
			max:100,
			required:true
		},		
		email:{
			type:String,
			max:200,
			required:true
		},
		username:{
			type:String,
			max:100,
			required:true
		}
	});

	//virtual for client's fullname
	ClientSchema
	.virtual('name')
	.get(function(){
		return this.lname +' '+this.fname;
	});
	

	//var Client =mongoose.model("clients",ClientSchema);
	module.exports=mongoose.model("clients",ClientSchema);

	/*module.exports.getClientByUsername=function(name,callback){
		var query={username:name};
		console.log(query);
		Client.find(query,'fname lname email',callback);
		//Client.find(query).toArray(callback);
	}*/
	

	/*module.exports.getUserById = function(id,callback){
		User.findById(id,callback);
	}

	module.exports.getUserByUsername=function(username,callback){
		//console.log('inside sch '+username);
		const query ={username:username};
		User.findOne(query,callback);
	}

	module.exports.setTransaction=function(newTrans,callback){
		if(err) throw err;
		newTrans.save(callback);
	}*/

