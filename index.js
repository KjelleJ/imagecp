import * as mobilenet from '@tensorflow-models/mobilenet';
import 'regenerator-runtime'; // only for parcel

  var model;
  var predictions;
  var img = document.getElementById('img');
  
  document.getElementById('predict').onclick = predict; // (1)
  document.getElementById('pasteArea').onpaste = pastedImage; // (2)

  // Anropa funktionen loadModel
  loadModel();
  
  // Ladda modellen och när det är klart kan vi klassificera bilderna	
  async function loadModel() {
	model = await mobilenet.load({version: 1, alpha: 1.0});
	document.getElementById("predict").disabled = false; // (3) enable predict button
	document.getElementById('results').innerHTML='';
    }

  // Klassificera en bild och när det är klart skriv ut resultatet
  async function predict() {
	img = document.getElementById('img');
	document.getElementById('results').innerHTML='';
	predictions = await model.classify(img);
	console.log(predictions);
	var result = '';
	result += '<br><b>' + ((predictions[0]['probability'])*100).toFixed(0) + 
		'%</b> ' + predictions[0]['className'] + '<br>';
	result += '<b>' + ((predictions[1]['probability'])*100).toFixed(0) + 
		'%</b> ' + predictions[1]['className'] + '<br>';
	result += '<b>' + ((predictions[2]['probability'])*100).toFixed(0) + 
		'%</b> ' + predictions[2]['className'];
	document.getElementById('results').innerHTML=result; // (4)
	}

  //  hantera inklistrad bild - http://jsfiddle.net/bt7BU/225/
  function pastedImage() { // (5)
	// use event.originalEvent.clipboard for newer chrome versions
	var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
	//  console.log(JSON.stringify(items)); // will give you the mime types
	// find pasted image among pasted items
	var blob = null;
	for (var i = 0; i < items.length; i++) {
		if (items[i].type.indexOf("image") === 0) {
		blob = items[i].getAsFile();
		}
	}
	// load image if there is a pasted image
	if (blob !== null) {
		var reader = new FileReader();
		reader.onload = function(event) {
        // console.log(event.target.result); // data url!
		document.getElementById("img").src = event.target.result;
		};
		reader.readAsDataURL(blob);
		document.getElementById('results').innerHTML='';
		}
	}
