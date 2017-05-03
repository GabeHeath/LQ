var TestApp = React.createClass({
	render: function() {
		return(
			<div>
				This is a test
			</div>
		)
	}
});

ReactDOM.render(
	<TestApp/>,
	document.getElementById("container")
);