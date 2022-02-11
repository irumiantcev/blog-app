import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Post } from './Post';

export const PostList = ({ data, onOpen }) => {
	if (!data.length) {
		return (
			<View style={styles.wrapper}>
				<Text style={styles.noItems}>No posts</Text>
			</View>
		);
	}

	return (
		<View style={styles.wrapper}>
			<FlatList
				data={data}
				keyExtractor={post => post.id.toString()}
				renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		padding: 10
	},
	noItems: {
		fontSize: 18,
		fontFamily: 'open-bold',
		textAlign: 'center',
		marginVertical: 10
	}
})