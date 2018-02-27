import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';

import Swipe from '../components/Swipe';
import * as actions from '../actions';

const renderCard = (job) => {
	const initialRegion = {
		longitude: job.longitude,
		latitude: job.latitude,
		latitudeDelta: 0.045,
		longitudeDelta: 0.02,
	};

	const { jobtitle, company, formattedRelativeTime } = job;
	const { flexStyle, mediumHeight, largeHeight } = styles;
	return (
		<Card title={jobtitle} containerStyle={largeHeight}>
			<View style={mediumHeight}>
				<MapView
					scrollEnabled={false}
					style={flexStyle}
					casheEnabled={Platform.OS === 'android'}
					initialRegion={initialRegion}
				/>
			</View>
			<View style={styles.detailWrapper}>
				<Text>{company}</Text>
				<Text>{formattedRelativeTime}</Text>
			</View>
			<Text>
				{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
			</Text>
		</Card>
	);
};

class DeckScreen extends Component {
	static navigationOptions = {
		title: 'Jobs',
		tabBarIcon: ({ tintColor }) => <Icon name="description" size={30} color={tintColor} />,
	}

	renderNoMoreCards = () => (
		<Card title="No More Jobs">
			<Button
				title="Back To Map"
				large
				icon={{ name: 'my-location' }}
				backgroundColor="#03A9F4"
				onPress={() => this.props.navigation.navigate('map')}
			/>
		</Card>
	);

	render() {
		return (
			<View style={styles.marginTop}>
				<Swipe
					data={this.props.jobs}
					renderCard={renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
					onSwipeRight={job => this.props.likeJob(job)}
					keyProp="jobkey"
				/>
			</View>
		);
	}
}

const styles = {
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10,
	},
	flexStyle: {
		flex: 1,
	},
	mediumHeight: {
		height: 300,
	},
	largeHeight: {
		height: 500,
	},
	marginTop: {
		marginTop: 10,
	},
};

DeckScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	likeJob: PropTypes.func.isRequired,
	jobs: PropTypes.isRequired,
};

function mapStateToProps({ jobs }) {
	return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
