const express = require('express');
const paystack = require('./server');

const app =express();
const pay =paystack('sk_test_4776da13179b40475fbef4cbd74857a120594d93');
//const Trans =require('./model/schemas');
//const Client=require('./model/client');

var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/ctl";
var random= require("randomstring");


app.get('/payment',function(req,res){

	MongoClient.connect(url,function(err,db){
	if(err) throw err;
	var query = {username: "sandy"};
	var plan=card_no=client_id="";
    var amount=500000;

	//get client info
		
		db.collection("clients").findOne(query,function(err,client){
			if(err) throw err;
			//console.log(client);			
			client_id =client._id;
			console.log('client_id is '+client_id);			

			//generate  & chk reference
			var existing_ref=0;
			var ref="";
			do{
				reference=random.generate(15);
				console.log(ref);

				var query = {reference: ref};
				db.collection("transactions").find(query).toArray(function(err,result){
					existing_ref=result.length;
					console.log('ref_count '+existing_ref);
				});
			}
			while(existing_ref >1);	

		
    		//get access code
    		pay.transaction.initialize({
        		"reference": ref, 
        		"amount": amount, 
        		"email": client.email
        		}).then(function(body,error){
        			console.log(error);
        			console.log(body);

                    //insert into transactions
                    var trans_obj={client_id:client_id,amount:amount,plan:plan,card_no:card_no,reference:ref};
                    db.collection("transactions").insertOne(trans_obj,function(err,res){
                        if(err) throw err;
                        console.log("1 transaction record inserted");
                       db.close();
                    });

    		});
		});	



	});
	/*Client.find({ 'username': 'micky' }, 'fname email', function (err, clients) {
		console.log('got something2');
	  if (err) return handleError(err);
	  console.log(clients);
  // 'athletes' contains the list of athletes that match the criteria.
});*/

	/*Client.getClientByUsername(testclient_username,(err,client)=>{
		console.log('got something');
		if(err)throw err;
		if(!client){
			return res.json({success:false,msg:'client not found'});
		}else{
			console.log(client);
		}
	});*/

	/*var query = Client.where({username: "micky"});
	query.findOne(function(err,client){
		if(err) return handleError(err);
		console.log(client);
	});
	//var query = {username: "micky"};

	
	/*Client.find(query).toArray(function(err,result){
		if(err) throw err;
		console.log(result);
		db.close();
	});
	
	/*using client_id, get info
	create new transaction,use trans id as ref then get accesscode
	update trans with accesscode*/
	//get client info
	//var testclient_username={username:"micky"};
	//var testclient_username="micky";
	//console.log('got something '+testclient_username);
	/*Client.getClientByUsername(testclient_username,(err,client)=>{
		console.log('got something');
		/*if(err)throw err;
		if(!client){
			return res.json({success:false,msg:'client not found'});
		}else{
			console.log(client);
		}
	});*/
	//new trans
	//let newTrans=new Trans({
		//client_id:req
	//})
});


app.listen(9000,function(){
	console.log('listening on port 9000');
})