import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: 'mewse',
			userData: [],
			userRepos: [],
			perPage: 5
		}
	}
	// Get user data from github
	getUserData() {
		$.ajax({
			url: `https://api.github.com/users/${this.state.username}?client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}`,
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data);
				this.setState({
					userData: data
				});
			}.bind(this),
			error: function(xhr, status, error) {
				this.setState({username: null});
				alert(error);
			}.bind(this)
		});
	}

	getUserRepos() {
		$.ajax({
			url: `https://api.github.com/users/${this.state.username}/repos?per_page=${this.state.perPage}&client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}&sort=created`,
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data);
				this.setState({
					userRepos: data
				});
			}.bind(this),
			error: function(xhr, status, error) {
				this.setState({username: null});
				alert(error);
			}.bind(this)
		});
	}

	handleFormSubmit(username) {
		this.setState({username: username}, function() {
			this.getUserData();
			this.getUserRepos();
		});
	}

	componentDidMount() {
		this.getUserData();
		this.getUserRepos();
	}
	render() {
		return (
			<div>
				<Search onFormSubmit = {this.handleFormSubmit.bind(this)}/>
				<Profile {...this.state} />
			</div>
		);
	}

}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
}

App.defaultProps = {
	clientId: '925f71eafc73690840a1',
	clientSecret: '4bd7d64f0bbe5eca85c79653b7c74551f7a731f6'
}

export default App;