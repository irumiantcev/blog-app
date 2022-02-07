import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';


const stackOptions = {
	headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
	}
}

const PostStack = createStackNavigator();
const PostStackScreen = ({ navigation }) => {
	return (
		<PostStack.Navigator
			screenOptions={stackOptions}
		>
			<PostStack.Screen
				name='Blog'
				component={MainScreen}
				options={{
					title: 'Blog',
					headerRight: () => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title='Take photo' iconName='ios-camera' onPress={() => navigation.navigate('CreateStackScreen')} />
						</HeaderButtons>
					),
					headerLeft: (props) => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				}}
			/>

			<PostStack.Screen name='Post' component={PostScreen} />
		</PostStack.Navigator>
	)
}

const BookedStack = createStackNavigator();
const BookedStackScreen = ({ navigation }) => {
	return (
		<BookedStack.Navigator
			screenOptions={stackOptions}
		>
			<BookedStack.Screen
				name='Favorites'
				component={BookedScreen}
				options={{
					headerLeft: (props) => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				}}
			/>
			<PostStack.Screen name='Post' component={PostScreen} />
		</BookedStack.Navigator>
	)
}

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const TabsScreen = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: THEME.MAIN_COLOR,
			}}
			barStyle={{
				backgroundColor: THEME.MAIN_COLOR
			}}
			shifting={true}
		>
			<Tab.Screen
				name='PostStackScreen'
				component={PostStackScreen}
				options={{
					tabBarLabel: 'Blog',
					tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.color} />,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name='BookedStackScreen'
				component={BookedStackScreen}
				options={{
					tabBarLabel: 'Favorites',
					tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.color} />,
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}

const CreateStack = createStackNavigator();
const CreateStackScreen = ({ navigation }) => {
	return (
		<CreateStack.Navigator
			screenOptions={stackOptions}
		>
			<CreateStack.Screen
				name='Create'
				component={CreateScreen}
				options={{
					title: 'Create new post',
					headerLeft: (props) => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				}}
			/>
		</CreateStack.Navigator>
	)
}

const AboutStack = createStackNavigator();
const AboutStackScreen = ({ navigation }) => {
	return (
		<AboutStack.Navigator
			screenOptions={stackOptions}
		>
			<AboutStack.Screen
				name='About'
				component={AboutScreen}
				options={{
					headerLeft: (props) => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				}}
			/>
		</AboutStack.Navigator>
	)
}


const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerActiveTintColor: THEME.MAIN_COLOR,
				drawerLabelStyle: {
					fontFamily: 'open-bold'
				}
			}}
		>
			<Drawer.Screen
				name='TabsScreen'
				component={TabsScreen}
				options={{
					drawerLabel: 'Blog'
				}}
			/>
			<Drawer.Screen
				name='CreateStackScreen'
				component={CreateStackScreen}
				options={{
					drawerLabel: 'Create'
				}}
			/>
			<Drawer.Screen
				name='AboutStackScreen'
				component={AboutStackScreen}
				options={{
					drawerLabel: 'About'
				}}
			/>
		</Drawer.Navigator>
	)
}

export const AppNavigation = () => {
	return (
		<NavigationContainer>
			<DrawerScreen/>
		</NavigationContainer>
	);
}