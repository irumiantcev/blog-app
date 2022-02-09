import React from 'react';
import { View, StyleSheet, Button, Image, Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({ img, setImg }) => {
	const [cameraPermission, setCameraPermission] = ImagePicker.useCameraPermissions();

	const handleTakePicture = async () => {
		if (cameraPermission.canAskAgain && !cameraPermission.granted) {
			const newCameraPermission = await setCameraPermission();

			if (!newCameraPermission.granted) {
				return false;
			}
		}

		if (!cameraPermission.canAskAgain && !cameraPermission.granted) {
			Alert.alert(
				'Camera denied',
				`You don't have permissions`,
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					},
						{
							text: "Open settings",
							onPress: async () => await Linking.openSettings()
						}
					]
			);

			return false;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: false,
			aspect: [16, 9],
			quality: 1,
		});

		if (!result.cancelled) {
			setImg(result.uri);
		}
	};


	return (
		<View style={styles.wrapper}>
			<Button title="Take Picture" onPress={handleTakePicture} />
			{img && <Image style={styles.image} source={{ uri: img }} />}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 10
	},
	image: {
		width: '100%',
		height: 200,
		marginTop: 10
	}
});