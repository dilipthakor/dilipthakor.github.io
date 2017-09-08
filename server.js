var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles ={

'artical-one': {
	title: 'Artical One : Dilip Thakor',
	heading: 'Artical One',
	date:'5 sep, 2017',
	content:`
	<p>
	rtical is about me.
	  </p>`
	},
'artical-two': {
	title: 'Artical Two : RD worman',
	heading: 'Artical three',
	date:'25 sep, 2017',
	content: `
	<p>
	    his arti hangout with me
	  </p>`
	},
'artical-three': {
	title: 'Artical Two : VD vadanaadr',
	heading: 'Artical Two',
	date:'10 sep, 2017',
	content: `
	<p>
	     its me. boring !!!! lol. 
	  </p>`
	}

};



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
    ${date}
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

app.get('/ui/madi.png', function(req,res){
	res.sendFile(path.join(__dirname,'ui','madi.png'));
	});


app.get('/ui/main.js', function(req,res){
	res.sendFile(path.join(__dirname,'ui','main.js'));
	});

app.get('/ui/style.css', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
    });


app.get('/:articleName', function(req, res){
	//articalName == aritcal-one
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
	});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
