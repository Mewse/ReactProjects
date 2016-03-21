import React, {Component} from 'react';

class Repo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		const {repo} = this.props;
		return (
			<li className="list-group-item">
				<a href={repo.html_url}>
					{repo.name}
				</a> : {repo.description}
			</li>
		)
	}
}

export default Repo;