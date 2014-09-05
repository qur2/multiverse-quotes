var Reflux = require('reflux');
var Backend = require('./file_backend')
var Actions = require('./actions')


var _books = [];

function getBookList() {
	Backend.getBookList().then(function(r) {
		r.sort(function(a, b) {
			return a.id - b.id;
		});
		_books = r;
		this.trigger(r);
	}.bind(this));
}

function getBook(bookId) {
	var book = _books.filter(function(book) {
		return book.id == bookId;
	});
	this.trigger(_books);
}

var bookStore = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.BookListLoad, this.getBookList);
	},
	getBookList: function() {
		getBookList.call(this);
	},
});

module.exports = bookStore;
