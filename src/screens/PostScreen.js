import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { removePost, toggleBooked } from '../store/actions/post';


export const PostScreen = ({ navigation, route }) => {
	const postId = route.params?.postId;

	const post = useSelector(state => state.post.allPosts.find(post => post.id === postId));
	const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));

	const dispatch = useDispatch();

	useEffect(() => {
		navigation.setOptions({
			title: `Post dated ${new Date(post?.date).toLocaleDateString()}`,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item title='Take photo' iconName={booked ? 'ios-star' : 'ios-star-outline'} onPress={() => dispatch(toggleBooked(post))} />
				</HeaderButtons>
			)
		});
	}, [post, booked]);

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
					onPress: () => {
						navigation.navigate('Blog');
						dispatch(removePost(postId));
					},
					style: 'destructive'
				}
			],
			{
				cancelable: false
			}
		)
	}

	if (!post) {
		return (
			<View style={styles.center}>
				<Text>No post</Text>
			</View>
		);
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
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})