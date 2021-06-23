import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./Home";
import NotificationScreen from "./Notification";

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
	<Tab.Navigator
		initialRouteName="Home"
		activeColor="#fff"
		inactiveColor="#774c60"
		barStyle={{ backgroundColor: "#9998A1" }}
		tabBarOptions={{
			keyboardHidesTabBar: false,
		}}
	>
		<Tab.Screen
			name="Home"
			component={HomeStackScreen}
			options={{
				tabBarLabel: "Home",
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons name="home" color={color} size={26} />
				),
			}}
		/>

		<Tab.Screen
			name="Notifications"
			component={NotificationStackScreen}
			options={{
				tabBarLabel: "Updates",
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons name="bell" color={color} size={26} />
				),
			}}
		/>
	</Tab.Navigator>
);

const HomeStackScreen = ({ navigation }) => (
	<HomeStack.Navigator
		initialRouteName="Home"
		screenOptions={{
			headerStyle: { backgroundColor: "#774c60" },
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		}}
	>
		<HomeStack.Screen
			name="Home"
			component={HomeScreen}
			options={{
				title: "Check your slot",
				headerLeft: () => (
					<Icon.Button
						name="ios-menu"
						size={25}
						backgroundColor="#774c60"
						onPress={() => navigation.openDrawer()}
					/>
				),
			}}
		/>
	</HomeStack.Navigator>
);

const NotificationStackScreen = ({ navigation }) => (
	<NotificationStack.Navigator
		initialRouteName="Notifications"
		screenOptions={{
			headerStyle: { backgroundColor: "#774c60" },
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		}}
	>
		<NotificationStack.Screen
			name="Notification"
			component={NotificationScreen}
			options={{
				headerLeft: () => (
					<Icon.Button
						name="ios-menu"
						size={25}
						backgroundColor="#774c60"
						onPress={() => navigation.openDrawer()}
					/>
				),
			}}
		/>
	</NotificationStack.Navigator>
);

export default MainTabScreen;
