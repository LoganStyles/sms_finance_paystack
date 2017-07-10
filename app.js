const express = require('express');
const paystack = require('./server');
const pay =paystack('sk_test_4776da13179b40475fbef4cbd74857a120594d93');

var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/ctl";
var random= require("randomstring");
var bodyParser=require('body-parser');
var request =require('request');
var path = require('path');
var exphbars = require('express-handlebars');

const app =express();
//view engine
app.use(express.static(__dirname + '/public'));
app.set('views',__dirname + '/public/views');
app.engine('html',exphbars({
	helpers:{
		json: function(obj){
			return JSON.stringify(obj);
		}
	}
}));
app.set('view engine','html');

//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.render('index.html');
})


app.get('/payment',function(req,res){

	MongoClient.connect(url,function(err,db){
	if(err) throw err;
	var query = {username: "sandy"};
	var plan=card_no=client_id=ref="";
    var amount=500000;

		//get client info		
		db.collection("clients").findOne(query,function(err,client){
			if(err) throw err;			

			//generate  & chk reference
			var existing_ref=0;			
			do{
				ref=random.generate(15);
				console.log('ref '+ref);

				var query = {reference: ref};
				db.collection("transactions").find(query).toArray(function(err,result){
					existing_ref=result.length;
					//console.log('ref_count '+existing_ref);
				});
			}
			while(existing_ref >1);	
		
    		//get access code
    		pay.transaction.initialize({
        		"reference": ref, 
        		"amount": amount, 
        		"email": client.email
        		}).then(function(body,error){
        			//console.log(error);
        			console.log(body);
        			var auth_url=body.data.authorization_url;
        			console.log('url '+auth_url);

                    //insert into transactions
                    var trans_obj={client_id:client._id,amount:amount,plan:plan,card_no:card_no,reference:ref,
                    	authorization_url:auth_url};

                    console.log(trans_obj);
                    db.collection("transactions").insertOne(trans_obj,function(err,res){
                        if(err) throw err;
                        console.log("1 transaction record inserted");
                       db.close();
                    });
                    res.redirect(auth_url);

    		});
		});	



	});
	/*res.render('payment.html',{
		cvv:'9393883'
	});*/
});


app.post('/makePayment',function(req,res){	
	console.log(req.body);
	//make payment
    		pay.transaction.verify({
        		"reference": ref, 
        		"authorization_code":auth_code,
        		"amount": amount, 
        		"email": client.email
        		}).then(function(body,error){
        			//console.log(error);
        			//console.log(body);

                    //insert into transactions
                    var trans_obj={client_id:client._id,amount:amount,plan:plan,card_no:card_no,reference:ref};
                    db.collection("transactions").insertOne(trans_obj,function(err,res){
                        if(err) throw err;
                        console.log("1 transaction record inserted");
                       db.close();
                    });

    		});
		});


app.listen(9000,function(){
	console.log('listening on port 9000');
})