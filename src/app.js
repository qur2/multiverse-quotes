/**
 * @jsx React.DOM
 */

var React = require('react');
var QuoteList = require('./QuoteList.react');
var BookSelector = require('./BookSelector.react');
var Actions = require('./actions');

React.renderComponent(
	<div className="well">
		<QuoteList />
	</div>,
	document.getElementById('quoteapp')
);

Actions.BookListLoad();