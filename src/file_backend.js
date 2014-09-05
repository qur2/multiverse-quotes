function get(url, converter) {
	if (!converter) {
		converter = JSON.parse;
	}

	var p = new Promise(function(resolve, reject) {
		var r = new XMLHttpRequest();
		r.open('GET', url, true);

		r.onload = function() {
			if (r.readyState != 4 || r.status != 200) {
				reject(r.responseText);
			} else {
				resolve(converter(r.responseText));
			}
		};

		r.onerror = function(error) {
			reject(error);
		};
		r.send();
	});

	return p;
}

function getBookList() {
	return get('/data/books.json');
}

function getBookQuotes(id) {
	return get('/data/'+id+'.json');
}

module.exports = {
	getBookList: getBookList,
	getBookQuotes: getBookQuotes
}