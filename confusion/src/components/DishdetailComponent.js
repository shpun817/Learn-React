import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {

	constructor(props) {
		super(props);
	}

	renderDish(dish) {
		return (
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	}

	renderComments(dish) {
		const comments = dish.comments.map((comment) => {
			return (
				<div key={comment.id}>
					<p>{comment.comment}</p>
					<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
				</div>
			);
		});
		if (comments != null) {
			return (
				<div>
					<h4>Comments</h4><br />
					{ comments }
				</div>
			);
		} else {
			return (<div>)</div>);
		}

	}

	render() {
		const dish = this.props.dish;
		if (dish != null) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-5 m-1">
							{ this.renderDish(dish) }
						</div>
						<div className="col-12 col-md-5 m-1">
							{ this.renderComments(dish) }
						</div>
					</div>
				</div>
			);
		} else {
			return (<div></div>);
		}
	}
}

export default DishDetail;