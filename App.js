import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const App = () => {
	// Navigation
	const MainNavigator = TabNavigator({
		welcome: { screen: WelcomeScreen },
		auth: { screen: AuthScreen },
		main: {

			screen: TabNavigator({
				map: MapScreen,
				deck: DeckScreen,
				review: {

					screen: StackNavigator({
						review: { screen: ReviewScreen },
						settings: { screen: SettingsScreen },
					}),
				},
			}),
		},
	}, {
			navigationOptions: {
				tabBarVisible: false,
			},
		});

	return (
		<Provider store={store}>
			<View style={styles.container}>
				<MainNavigator />
			</View>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
