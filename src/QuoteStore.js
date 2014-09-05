var Actions = require('./actions')
var Backend = require('./file_backend')
var Reflux = require('reflux');

var _quotes = [];

function getBookQuotes(id) {
	Backend.getBookQuotes(id).then(function(r) {
		r.sort(function(a, b) {
			return a.page - b.page;
		});
		_quotes = r;
		this.trigger(r);
	}.bind(this));
}

var quoteStore = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.BookSelect, this.getBookQuotes);
	},
	getBookQuotes: function(id) {
		getBookQuotes.call(this, id);
	},
});

module.exports = quoteStore;
