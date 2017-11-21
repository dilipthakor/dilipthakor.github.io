var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
	user:'postgres',
	database:'postgres',
	host:'localhost',
	port: '5432',
	password:'toor'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
	secret: 'sameRandomSecretValue',
	cookie: {maxAge: 100 * 60 * 60 * 24 * 30}
}));




function createTemplate(data){
  var title=data.title;
  var date=data.date;
  var heading= data.heading;
  var content= data.content;
  var htmlTemplate=`
  <html>
  <head>
    <title>
    ${title}
    </title>
    <meta name=""viewport content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
  </head>
  <body>
	 <div class="container">
    <div>
    <a href="/">Home</a>
    </div>
    <hr/>
    <div>
    <h3>
    ${heading}
    </h3>
    </div>
    ${date.toDateString()}
    <div>
	  ${content}
	</div>
	</div>
  </body>
</html>

`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt) {
	// how do we create hash?
	var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
	return ["pbkdf2","10000",salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res){
	var hashedString = hash(req.params.input, 'this-is-same-random-string');
	res.send(hashedString);
});

app.post('/create-user', function(req,res){
	//username password
	//JSON
	var username = req.body.username;
	var password = req.body.password;

	salt = crypto.randomBytes(128).toString('hex');
	var dbString = hash(password, salt);
	pool.query('SELECT * FROM "user" (username,password) VALUES($1, $2)',[username, dbString], function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}else{
			res.send('User Successfully created' + username);
		}
	});
});

app.post('/login', function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}else{
			if(result.rows.length === 0){
				res.send(403).send('username/password is invalid');
			}else {
				//match the password
				var dbStirng = result.row[0].password;
				var salt = dbString.spit('$')[2];
				var hashedPassword = hash(password, salt); // creating a hash based on the password submitted and the original salt
				if(hashedPassword === dbString){
					res.send('credentials corrent');
				}else{
					res.send(403).send('username/password is invalid');
				}
			}

		}
	});

});

var pool = new Pool(config);
app.get('/test-db', function(req,res){
	//make a select XMLHttpRequest
	//return a response with the result

  pool.query('SELECT *FROM test', function(err,result){
	if(err){
		res.status(500).send(err.toString());
	}else{
		res.send(JSON.stringify(result.rows));
	}
	});

});



var counter = 0;
app.get('/counter', function(req,res){
	counter = counter+1;
	res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res){ // /submit?name=xxx
	//get the name from the req
	var name = req.query.name;

	names.push(name);
	//JSON : javascript object notations
	res.send(JSON.stringify(names));
});


app.get('/ui/madi.png', function(req,res){
	res.sendFile(path.join(__dirname,'ui','madi.png'));
	});




app.get('/ui/main.js', function(req,res){
	res.sendFile(path.join(__dirname,'ui','main.js'));
	});

app.get('/ui/style.css', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
    });


app.get('/articles/:articleName', function(req, res){
	//articalName == aritcal-one
	//articals[articalName] == 'artical-one'

	//SELECT *FROM artical WHERE title = 'artical-one'

	//pool.query("SELECT *FROM article WHERE title = '"+ req.params.articleName+  "'", function(err,result){
	// uper line is vunrable for sql injection
	pool.query("SELECT *FROM article WHERE title = $1", [req.params.articleName], function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}else{
			if(result.rows.length == 0){
				res.status(404).send('Artical not found');
			}else{
				var articleData = result.rows[0];
				res.send(createTemplate(articleData));
			}
		}
	});

});



var port = 8081; // Use 8080 for local development because you might already have apache running on 80
app.listen(8081, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
