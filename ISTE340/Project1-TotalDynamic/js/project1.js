var dataObj;

//console.log(dataObj);


function genPage(){
	//debugger;
	// var mydiv = document.createElement('div');
	// mydiv.setAttribute('id', 'pageWrapper');

	dataObj = new Object();

var xmlhttp = new XMLHttpRequest();
var url = "https://people.rit.edu/~ap6932/ISTE340/js/data.json";
//var data;
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		
		dataObj = JSON.parse(xmlhttp.responseText);
		console.log(dataObj);
		console.log(Object.keys(dataObj)[0]);
	}
};

xmlhttp.open("GET", "https://people.rit.edu/~ap6932/ISTE340/js/data.json", false);
xmlhttp.send();

	var myheader = document.createElement('header');
	
	var myh2 = document.createElement('h1');
	myh2.appendChild( document.createTextNode("A Hungry Man") );

	myheader.appendChild(myh2);


	var myForm = document.createElement('form');
	myForm.setAttribute('id', 'myForm');

	var mybody = document.getElementsByTagName('body')[0];
	//mybody.appendChild(mydiv);
	mybody.appendChild(myheader);
	mybody.appendChild(myForm);

	
	//fetches the first key from the JSON Object;

	displayNextQuestion(Object.keys(dataObj)[0]);


}

function displayNextQuestion(choice) {


		//console.log(choice);
		var SEle = document.createElement('Select');
		SEle.setAttribute( 'id', choice );
		SEle.setAttribute('onchange', 'getChoice(this)');
		
		//Store values of next/chosen property in an array 
		//console.log(dataObj[choice]);
		var arr = dataObj[choice];
		
		//for each value in property- create H2 element for question and option element for choices
		for (var i=0; i < arr.length; i++){
			
			//var mydiv;
			var myform;	
			
			if (i==0) { 
				
				// mybody = document.getElementsByTagName('body')[0];
				// myform = mybody.getElementsByTagName('form')[0];

				myform = document.getElementsByTagName('body')[0].getElementsByTagName('form')[0];
				
				myQdiv = document.createElement('div');
				//Need work here
				myQdiv.setAttribute('id', ('q' + (i + 1 ) ));
				


				var hEle = document.createElement("h2");
		
				var text = document.createTextNode(arr[i]);

				
				
				hEle.appendChild(text);
				
				myQdiv.appendChild(hEle);
				//myform.appendChild(myQdiv);
				
			}

			else
			{			
				createOptions(SEle, arr[i]);
			}

		} //end for loop

		

		myQdiv.appendChild(SEle);
		myform.appendChild(myQdiv);
			
}

function getChoice(selectObj){

	while (selectObj != ((selectObj.parentNode.parentNode).lastChild).lastChild){
	 		selectObj.parentNode.parentNode.removeChild(selectObj.parentNode.parentNode.lastChild);

	 }

	if (selectObj != null){	
		//debugger;
		//Store the option picked in the variable choice 
		var choice = (selectObj[selectObj.selectedIndex].value);


		//IF THE KEY IS DEFINED
		if (dataObj[choice] != null){
			//Call method to display next question; pass the option chosen as argument		 
			displayNextQuestion(choice);
		}
		else {
			debugger;
			var myinput = document.createElement('input');
			myinput.setAttribute('type', 'submit');
			myinput.setAttribute('value', 'Submit');

			//document.getElementById('myForm').appendChild(myinput);
			document.getElementsByTagName('body')[0].appendChild(document.getElementById('myForm').appendChild(myinput));
			
		}
	}
}

/*
 *	function adds options to the drop down
*/
function createOptions(SElement, option) {
	//console.log(option);
	var opt = document.createElement("option");
	opt.value = option;
	opt.text = option;
	//opt.setAttribute('value', option);
	//opt.setAttribute('text', option);
	SElement.appendChild(opt);
	
}









