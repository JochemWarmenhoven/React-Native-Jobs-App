import _ from 'lodash';
import { LIKE_JOB } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case LIKE_JOB:
			return _.uniqBy([
				action.payload, ...state,
			], 'jobkey');

		default:
			return state;
	}
};
