import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
	Modal, ModalHeader, ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	render() {
		return(
			<React.Fragment>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" xs={12}>Rating</Label>
								<Col xs={12}>
									<Control.select model=".rating" name="rating"
										className="form-control">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" xs="12">Your Name</Label>
								<Col xs="12">
									<Control.text model=".author" id="author" name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											minLength: minLength(3),
											maxLength: maxLength(15)
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											minLength: 'Must be greater than 2 characters',
											maxLength: 'Must be 15 characters or less'
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" xs="12">Comment</Label>
								<Col xs="12">
									<Control.textarea model=".comment" id="comment" name="comment"
									rows="6"
									className="form-control" />
								</Col>
							</Row>
							<Row className="form-group">
								<Col xs="12">
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
			</React.Fragment>
		);
	}
}

function RenderDish({dish}) {
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

function RenderComments({dishComments, addComment, dishId}) {
	const comments = dishComments.map((comment) => {
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
				<CommentForm addComment={addComment} dishId={dishId} />
			</div>
		);
	} else {
		return (<div>)</div>);
	}
}

const DishDetail = (props) => {
	const dish = props.dish;
	const comments = props.comments;
	if (dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments dishComments={comments}
							addComment={props.addComment}
							dishId={props.dish.id} />
					</div>
				</div>
			</div>
		);
	} else {
		return (<div></div>);
	}
}


export default DishDetail;