import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	Button,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';

import { THEME } from '../theme';
import { addPost } from '../store/actions/post';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
	const [text, setText] = useState('');
	const [img, setImg] = useState(null);
	const dispatch = useDispatch();

	const saveHandler = () => {
		const post = {
			date: new Date().toJSON(),
			text,
			img,
			booked: false
		};
		dispatch(addPost(post));
		navigation.navigate('Blog');
		setText('');
		setImg(null);
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
					<PhotoPicker img={img} setImg={setImg} />
					<Button title='Add post' color={THEME.MAIN_COLOR} onPress={saveHandler} disabled={!text || !img} />
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
		marginBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR,
		fontSize: 18,
		fontFamily: 'open-regular'
	}
})