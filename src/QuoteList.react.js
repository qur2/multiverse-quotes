/** @jsx React.DOM */

var QuoteStore = require('./QuoteStore');
var React = require('react');
var Reflux = require('reflux');
var BookSelector = require('./BookSelector.react');


var QuoteList = React.createClass({
	mixins: [Reflux.ListenerMixin],

	getInitialState: function() {
		return {
			quotes: [],
			active: {text: 'Ça arrive...'}
		};
	},

	onQuoteLoad: function(quotes) {
		this.setState({
			quotes: quotes,
			active: quotes[0]
		});
	},
	componentDidMount: function() {
		this.listenTo(QuoteStore, this.onQuoteLoad);
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
	doSelectQuote: function(e) {
		var quotes = this.state.quotes,
			i = quotes.length;
		var linkTarget = this.isTarget(e, 'LI');
		if (linkTarget && i) {
			while (i--) {
				if (this.state.active == quotes[i]) {
					break;
				}
			}
			var inc = linkTarget.getAttribute('rel') == 'prev' ? -1 : 1;
			// make sure that i is not out of bound
			i = (i + quotes.length + inc) % quotes.length;
			this.setState({
				active: quotes[i]
			});
		}
	},
	render: function() {
		return <div className="QuoteList" onClick={this.doSelectQuote}>
			<ul className="pager text-right">
				<li className="previous" rel="prev"><a href="#">⟵ <span className="bullet">🐘</span></a></li>
				<li className="next" rel="next"><a href="#"><span className="bullet">🐘</span> ⟶</a></li>
			</ul>
			<blockquote>
				{this.state.active.text}
				<footer className="text-right"><cite>
					<span className="bullet">🐢</span>Page {this.state.active.page}, <BookSelector showQuoteCount={false} />
				</cite></footer>
			</blockquote>
		</div>;
	}
});

module.exports = QuoteList;
