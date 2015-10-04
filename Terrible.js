function mostLike(input1, input2, list) {
	var words1 = keyWords(input1);
	var words2 = keyWords(input2);
	
	for(var key in list) {
		if (list.hasOwnProperty(key)) {
			list[key] = keyWords(list[key]);
		}
	}
	
	for(var key in list) {
		scores[key] = compare([words1, list[key]]) + compare([words2, list[key]]);
	}
	
	var max = 0;
	var id;
	
	for(var key in scores) {
		if(scores[key] > max) {
			max = scores[key];
			id = key;
		}
	}
	return id;
}

function keyWords(input) {
	var output = encodeURIComponent(input);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords?apikey=d79b2f182c0d4d69131506db921116ae3a044c74&text=" + output + "&outputMode=json", false);
	xhr.send(null);
	
	console.log(xhr.status);
	
	var text = JSON.parse(xhr.responseText);
	
	var keywords = text.keywords;
	
	for(var i = 0; i < keywords.length; i++) {
		keywords[i] = keywords[i].text;
	}
	
	var counter = 0;
	
	while(counter < keywords.length) {
		if(keywords[counter].split(" ").length > 1) {
			var words = keywords[counter].split(" ").length;
			var temp = keywords[counter].split(" ");
			keywords[counter] = temp[Math.floor(Math.random()*words)];
		}
		counter++;
	}
	
	keywords.sort();
	
	return keywords;
}
	
function compare(arrays) {
	var result = arrays.shift().reduce(function(res, v) {
		if (res.indexOf(v) === -1 && arrays.every(function(a) {
			return a.indexOf(v) !== -1;
		})) res.push(v);
		return res;
	}, []);
	
	return result.length;
}