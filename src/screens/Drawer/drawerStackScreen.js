import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import AboutScreen from "./AboutScreen";
import HelpScreen from "./HelpScreen";

const AboutStack = createStackNavigator();
const HelpStack = createStackNavigator();

export const AboutStackScreen = ({ navigation }) => (
	<AboutStack.Navigator
		initialRouteName="About"
		screenOptions={{
			headerStyle: { backgroundColor: "#774c60" },
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		}}
	>
		<AboutStack.Screen
			name="About"
			component={AboutScreen}
			options={{
				title: "About: Slot-Checker",
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
	</AboutStack.Navigator>
);

export const HelpStackScreen = ({ navigation }) => (
	<HelpStack.Navigator
		initialRouteName="help"
		screenOptions={{
			headerStyle: { backgroundColor: "#774c60" },
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		}}
	>
		<HelpStack.Screen
			name="help"
			component={HelpScreen}
			options={{
				title: "How to use Slot-Checker:",
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
	</HelpStack.Navigator>
);
