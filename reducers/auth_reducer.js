import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../actions/types';

const initialState = {

};

export default (state = initialState, action) => {
	switch (action.type) {
		case FACEBOOK_LOGIN_SUCCESS:
			return { ...state, token: action.payload };
		case FACEBOOK_LOGIN_FAIL:
			return { ...state, token: null };
		default:
			return state;
	}
};

