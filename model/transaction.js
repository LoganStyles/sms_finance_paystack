const 
	mongoose = require('mongoose'),
	config = require('../config/database'),

TransSchema = mongoose.Schema({
		client_id:{
			type:Schema.ObjectId,
			ref:'clients',
			required:true
		},
		amount:{
			type:String
		},
		plan:{
			type:String
		},
		card_no:{
			type:String
		},
		access_code:{//gotten from paystack
			type:String,
			required:true
		}
	});

Trans =module.exports=mongoose.model("transactions",TransSchema);