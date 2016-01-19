/* Getting Started with React Tutorial
 *
 */

var TodoList = React.createClass({
	render: function() {
		var createItem = function(item) {
			return <li key={item.id}>{item.text}</li>;
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}
});

var TodoApp = React.createClass({

	// This is where we tell React to set the initial state of our application.
	// We will return an empty array of items which is where we will store our todos
	getInitialState: function() {
		return { items: [], text: '' };
	},

	// This React function watches for any UI changes (value input, checked checkboxes,
	// selected option). Each time the UI is changed, we will set the React state based on our input
	onChange: function(e) {
		this.setState({ text: e.target.value });
	},

	// This function will handle our form submit. First, we prevent the default submit event.
	// Next, we set a 'nextItems' variable in which we grab the item text from the 'onChange'
	// function along with setting an 'id' using the current date. After, we set the 'nextText'
	// to empty to set it up for the next entry. Finally, we use the 'setState' function to
	// merge current and previous states and prepare for a new entry.
	handleSubmit: function(e) {

		e.preventDefault();

		var nextItems = this.state.items.concat([{
			text: this.state.text,
			id: Date.now()
		}]);

		var nextText = '';

		this.setState({
			items: nextItems,
			text: nextText
		});
	},

	// This is where we will be calling another React component that will handle
	// render list items. What we are basically doing is calling one compenent
	// inside of another.
	render: function() {
		return (
			<div>
				<div className="row">
					<div className="four columns">
						<form onSubmit={this.handleSubmit}>
							<input className="u-full-width" type="text" onChange={this.onChange} value={this.state.text} />
							<button className="button-primary">Add +</button>
						</form>
					</div>
					<div className="eight columns">
						<TodoList items={this.state.items} />
					</div>
				</div>
			</div>
		);
	}
});

// The last step in our app is to render it all to our real DOM. We will call
// `ReactDOM.render()` method along with our main app and a place for it to go.
// In this example, we want to render it to `<div id="content"></div>`.
ReactDOM.render(
	<TodoApp />,
	document.getElementById('content')
);