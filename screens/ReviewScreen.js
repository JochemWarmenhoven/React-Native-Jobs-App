import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';


class ReviewScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Review Jobs',
		headerRight: (
			<Button
				title="Settings"
				onPress={() => navigation.navigate('settings')}
				backgroundColor="rgba(0,0,0,0)"
				color="rgba(0, 122, 255, 1)"
			/>
		),
		tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />,
		style: {
			marginTop: Platform.OS === 'android' ? 24 : 0,
		},
	});

	renderLikedJobs() {
		return this.props.likedJobs.map((job) => {
			const {
				company,
				formattedRelativeTime,
				url,
				longitude,
				latitude,
				jobtitle,
				jobkey,
			} = job;
			const initialRegion = {
				longitude,
				latitude,
				longitudeDelta: 0.045,
				latitudeDelta: 0.02,
			};

			return (
				<Card title={jobtitle} key={jobkey}>
					<View style={styles.height}>
						<MapView
							style={styles.flex}
							cacheEnabled={Platform.OS === 'android'}
							scrollEnabled={false}
							initialRegion={initialRegion}
						/>
						<View style={styles.detailWrapper}>
							<Text style={styles.italics}>{company}</Text>
							<Text style={styles.italics}>{formattedRelativeTime}</Text>
						</View>
						<Button
							title="Apply Now!"
							backgroundColor="#03A9F4"
							onPress={() => Linking.openURL(url)}
						/>
					</View>
				</Card>
			);
		});
	}

	render() {
		return (
			<ScrollView>
				{this.renderLikedJobs()}
			</ScrollView>
		);
	}
}

const styles = {
	detailWrapper: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	italics: {
		fontStyle: 'italic',
	},
	flex: {
		flex: 1,
	},
	height: {
		height: 300,
	},
};

ReviewScreen.propTypes = {
	likedJobs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

function mapStateToProps(state) {
	return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
