import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { DATA } from '../data';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const PostScreen = ({ navigation, route }) => {
	const postId = route.params?.postId;
	const post = DATA.find(p => p.id === postId);

	useEffect(() => {
		navigation.setOptions({
			title: `Post dated ${new Date(post.date).toLocaleDateString()}`,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item title='Take photo' iconName={post.booked ? 'ios-star' : 'ios-star-outline'} onPress={() => console.log('pressed star')} />
				</HeaderButtons>
			)
		});

	}, [postId]);

	const removeHandler = () => {
		Alert.alert(
			'Remove post',
			'Are you sure?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => {},
					style: 'destructive'
				}
			],
			{
				cancelable: false
			}
		)
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{uri: post.img}} />
			<View style={styles.textWrap}>
				<Text style={styles.title}>{post.text}</Text>
			</View>
			<Button title='Delete' color={THEME.DANGER_COLOR} onPress={removeHandler} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 250
	},
	textWrap: {
		padding: 10
	},
	title: {
		fontFamily: 'open-regular'
	}
})