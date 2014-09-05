/** @jsx React.DOM */

var Actions = require('./actions');
var BookStore = require('./BookStore');
var QuoteStore = require('./QuoteStore');
var React = require('react');
var Reflux = require('reflux');


var BookSelector = React.createClass({
	mixins: [Reflux.ListenerMixin],

	propTypes: {
		showQuoteCount: React.PropTypes.bool.isRequired,
	},

	getInitialState: function() {
		return {
			books: [{title_fr: 'Ça charge...'}],
			active: {title_fr: 'Choisissez un livre'}
		};
	},
	selectBook: function(id) {
		this.setState({
			active: this.getBookById(id)
		});
		Actions.BookSelect(id);
	},
	isTarget: function(e, nodeName) {
		var linkTarget,
			el = e.target;
		while (el != e.currentTarget) {
			if (el.nodeName == nodeName) {
				linkTarget = el;
				break;
			}
			el = el.parentNode;
		}
		return linkTarget;
	},
	doSelectBook: function(e) {
		var linkTarget = this.isTarget(e, 'A');
		if (linkTarget) {
			this.selectBook(linkTarget.getAttribute('rel'))
		}
	},
	getBookById: function(bookId) {
		return this.state.books.filter(function(b) {
			return b.id == bookId;
		}).pop();
	},
	onBookUpdate: function(books) {
		this.setState({
			books: books.filter(function(b) {
				return b.quotes
			}),
		});
		this.selectBook(this.state.books[0].id);
	},
	componentDidMount: function() {
		this.listenTo(BookStore, this.onBookUpdate);
	},
	render: function() {
		var self = this;
		return (
			// <div className="list-group" onClick={this.doSelectBook}>
			// 	{this.state.books.map(function (book, i) {
			// 		return <a href="#" key={book.id} rel={book.id} className={book == self.state.active ? 'list-group-item active':'list-group-item'}>
			// 			{self.props.showQuoteCount ? <span className="badge">{book.quotes}</span>:''}
			// 			<span className="bullet">{book == self.state.active ? '🐢':''}</span> {book.title_fr}
			// 		</a>
			// 	})}
			// </div>
			<div className="dropdown" onClick={this.doSelectBook}>
				<button className="btn btn-default btn-lg dropdown-toggle" type="button" id="dropdownBooks" data-toggle="dropdown">
					{this.state.books.filter(function (book) {
						return book == self.state.active;
					}).map(function (book, i) {
						return book.title_fr;
					})}
					&nbsp;
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu" role="menu" aria-labelledby="dropdownBooks">
					{this.state.books.filter(function (book) {
						return book != self.state.active;
					}).map(function (book, i) {
						return <li role="presentation">
							<a role="menuitem" href="#" rel={book.id} key={book.id}>
								{self.props.showQuoteCount ? <span className="badge">{book.quotes}</span>:''}
								{book.title_fr}
							</a>
						</li>
					})}
				</ul>
			</div>
		);
	}
});

module.exports = BookSelector;
