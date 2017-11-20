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
var button = document.getElementById('counter');

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


// submit name

var submit = document.getElementById('submit_btn');

submit.onclick = function(){

	 // create request

	 var request = new XMLHttpRequest();

	 // capture the response and store it in a variable

	 request.onreadystatechange = function(){
	 	if (request.readyState === XMLHttpRequest.DONE){
	 		//take action
	 		if (request.status === 200){
				//capture a list of name and render it as a list
	 			var names = request.responseText;
	 			names = JSON.parse(names);
				var list = '';

				for (var i=0; i< names.length; i++){
					list += '<li>' + names[i]+ '</li>';

				}
				var ul = document.getElementById('namelist');
				ul.innerHTML = list;

	 		}
	 	}
	 	// Not done yet
	 };

	 	//make a request
		var nameInput = document.getElementById('name');
		var name = nameInput.value;
	 		request.open('GET', 'http://localhost:8081/submit-name?name=' + name, true);
	 		request.send(null);


};
