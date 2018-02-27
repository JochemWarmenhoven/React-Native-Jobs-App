import { FETCH_JOBS } from '../actions/types';

const initialState = {
	results: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_JOBS:
			return action.payload;
		default:
			return state;
	}
};
