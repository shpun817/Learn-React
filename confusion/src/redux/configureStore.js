import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes, // dishes state is managed by the reducer Dishes
			comments: Comments,
			promotions: Promotions,
			leaders: Leaders
		})
	);

	return store;
};