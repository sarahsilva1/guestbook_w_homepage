var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();


/* GET guestlist page. */
router.get('/guestbook', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "userlist" : docs
        });
    });
});

/* GET New User Page*/
router.get('/newuser',function(req,res){
	res.render('newuser',{ title:'Add New User'});
})

/* GET single_view Page*/
router.get('/single_view',function(req,res){
	res.render('single_view',{ title:'Single User View'});
})

/* GET test Page*/
router.get('/',function(req,res){
	res.render('home',{ title:'Home Page'});
})


/* POST to Add User Service */
router.post('/adduser', function(req,res){
	//set our internal db variable
	var db = req.db;

	//get our form values, these rely on the "name attributes"
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	var userComment = req.body.usercomment;

	//set our collection
	var collection = db.get('usercollection');

	//submit to the db
	collection.insert({
		"username" :userName,
		"email": userEmail,
		"comment": userComment

	}, function(err,doc){
		if(err){
			//if it failed, return error
			res.send("There was a problem adding the information to the database");
		}
		else{
			//ad forward to sucess page
			res.redirect("/guestbook");
		}
	});
});

//delete guest book entry
router.get('/:id', function(req,res){
	var id = req.params.id;
	var objectId = new ObjectID(id);
	var db = req.db;
	var collection = db.get('usercollection');
	console.log(collection);
	collection.remove({_id: objectId});
	res.redirect('/guestbook');

});

// this is what I was missing

router.get('/:id/usermessage', function(req,res){
	var id = req.params.id;
	var objectId = new ObjectID(id);

	var db = req.db;
	var collection = db.get('usercollection');
	console.log(collection);
	collection.find({_id: objectId}, function(err, result){

		if(err){
			res.send("there was an error");
		}
		else{
		res.render('message', {
				"usermessage" : result
			});
		//res.json(result);
		}
	});
});

// I had this

module.exports = router;

// anchor href id={user}
