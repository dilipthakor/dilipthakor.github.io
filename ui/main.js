//console.log('Loaded!');

/*var img = document.getElementById('madi');


 function moveRight(){
  marginLeft = marginLeft +'1';
  img.style.marginLeft = marginLeft + 'px';

};
img.onclick = function(){
  var interval = setInterval(moveRight,10);
  img.style.marginLeft = "100px";
};

*/


//counter code
/** var button = document.getElementById('counter');

button.onclick = function(){

// create request

var request = new XMLHttpRequest();

// capture the response and store it in a variable

request.onreadystatechange = function(){
	if (request.readyState === XMLHttpRequest.DONE){
		//take action
		if (request.status === 200){
			var counter = request.responseText;
			var span = document.getElementById('count');
			span.innerHTML = counter.toString();
		}
	}
	// Not done yet
};

	//make a request
		request.open('GET', 'http://localhost:8081/counter', true);
		request.send(null);
		};
**/

// submit username/password to login

var submit = document.getElementById('submit_btn');

submit.onclick = function(){

	 // create request

	 var request = new XMLHttpRequest();

	 // capture the response and store it in a variable

	 request.onreadystatechange = function(){
	 	if (request.readyState === XMLHttpRequest.DONE){
	 		//take action
	 		if (request.status === 200){
				alert('Logged in Successfully');
			}else if(request.status === 403) {
				alert('Username or password id incorrect');
			}else if ( request.status === 500){
				alert('something went wrong on the server');
			}
	 	}
	 	// Not done yet
	 };

	 	//make a request
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		console.log(username);
		console.log(password);
	 		request.open('POST', 'http://localhost:8081/login', true);
			request.setRequestHeader('Content-Type', 'application/json');
	 		request.send(JSON.stringify({username: username, password: password}));


};
