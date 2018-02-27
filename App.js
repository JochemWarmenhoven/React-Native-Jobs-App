import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Notifications } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

class App extends Component {
	componentDidMount() {
		registerForNotifications();
		Notifications.addListener((notification) => {
			const { data: { text }, origin } = notification;
			if (origin === 'recieved' && text) {
				Alert.alert(
					'New Push Notification',
					text,
					[{ text: 'Ok.' }],
				);
			}
		});
	}

	render() {
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
				}, {
						tabBarPosition: 'bottom',
						tabBarOptions: {
							labelStyle: { fontSize: 12 },
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
	}
}

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
