import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';

import store from './src/store';
import { AppNavigation } from './src/navigation/AppNavigation';
import { DB } from './src/db';

export default function App() {
    const [fontsLoaded] = useFonts({
        'open-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    useEffect(async () => {
        try {
            await DB.init();
            console.log('Database ready....');
        } catch (e) {
            console.log('Error:', e);
        }
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
