import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';


export const facebookLogin = () => async (dispatch) => {
	let token = await AsyncStorage.getItem('fb_token');
	if (token) {
		// Dispatch an action saying login is done
		dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
	} else {
		// Start up FB Login process
		doFacebookLogin(dispatch);
	}
};

const doFacebookLogin = async (dispatch) => {
	let { type, token } = await Facebook.logInWithReadPermissionsAsync('1930430707270675', {
		permissions: ['public_profile'],
	});
	if (type === 'cancel') {
		return dispatch({ type: FACEBOOK_LOGIN_FAIL });
	}

	await AsyncStorage.setItem('fb_token', token);
	return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

export const apple = '';
