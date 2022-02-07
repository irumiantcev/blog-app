import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';

import store from './src/store';
import { AppNavigation } from './src/navigation/AppNavigation';

export default function App() {
    let [fontsLoaded] = useFonts({
        'open-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
