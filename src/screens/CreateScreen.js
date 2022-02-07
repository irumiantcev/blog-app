import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	Image,
	Button,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';

import { THEME } from '../theme';
import { addPost } from '../store/actions/post';

export const CreateScreen = ({ navigation }) => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();

	const img = 'https://www.arturodraws.com/uploads/4/1/6/5/41651745/kevin-love_orig.jpg';

	const saveHandler = () => {
		const post = {
			date: new Date().toJSON(),
			text,
			img,
			booked: false
		};
		dispatch(addPost(post));
		navigation.navigate('Blog');
	}

	return (
		<ScrollView>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.wrapper}>
					<TextInput
						style={styles.textarea}
						placeholder='Text here...'
						value={text}
						onChangeText={setText}
						multiline
					/>
					<Image
						style={{ width: '100%', height: 200, marginBottom: 10 }}
						source={{uri: img}}
					/>
					<Button title='Add post' color={THEME.MAIN_COLOR} onPress={saveHandler} />
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 10
	},
	textarea: {
		padding: 10,
		marginBottom: 10
	}
})