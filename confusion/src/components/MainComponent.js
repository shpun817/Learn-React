import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
		return {
			dishes: state.dishes,
			comments: state.comments,
			promotions: state.promotions,
			leaders: state.leaders
		};
};

class Main extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const HomePage = () => {
			return(
				<Home dish={this.props.dishes.filter( (item) => item.featured )[0]}
					promotion={this.props.promotions.filter( (item) => item.featured )[0]}
					leader={this.props.leaders.filter( (item) => item.featured )[0]} />
			);
		};

		const AboutPage = () => {
			return(
				<About leaders={this.props.leaders} />
			);
		}

		const DishWithId = ({match}) => {
			return(
				<DishDetail dish={this.props.dishes.filter( (dish) => dish.id == match.params.dishId)[0]}
					comments={this.props.comments.filter( (comment) => comment.dishId == match.params.dishId)} />
			);
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
					<Route path="/menu/:dishId" component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />
					<Route exact path="/aboutus" component={AboutPage} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps)(Main));