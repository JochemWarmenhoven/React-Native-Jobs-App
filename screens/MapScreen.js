import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

class MapScreen extends Component {
	static navigationOptions = {
		title: 'Map',
		tabBarIcon: ({ tintColor }) => <Icon name="my-location" size={30} color={tintColor} />,
	}
	state = {
		mapLoaded: false,
		region: {
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta: 0.09,
		},
	}

	componentDidMount = () => {
		this.setState({ mapLoaded: true });
	};

	onRegionChangeComplete = (region) => {
		this.setState({ region });
	}

	onButtonPress = () => {
		this.props.fetchJobs(this.state.region, () => {
			this.props.navigation.navigate('deck');
		});
	}

	render() {
		const { flexStyle, justifyContent } = styles;
		if (!this.state.mapLoaded) {
			return (
				<View style={[flexStyle, justifyContent]}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
		return (
			<View style={flexStyle}>
				<MapView
					region={this.state.region}
					style={flexStyle}
					onRegionChangeComplete={this.onRegionChangeComplete}
				/>
				<View style={styles.buttonContainer}>
					<Button
						large
						title="Search This Area"
						backgroundColor="#009688"
						icon={{ name: 'search' }}
						onPress={this.onButtonPress}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	buttonContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
	},
	flexStyle: {
		flex: 1,
	},
	justifyContent: {
		justifyContent: 'center',
	},
};

MapScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	fetchJobs: PropTypes.func.isRequired,
};

export default connect(null, actions)(MapScreen);
