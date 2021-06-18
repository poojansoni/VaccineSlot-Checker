import "react-native-gesture-handler";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/screens/Home";
import DetailsScreen from "./src/screens/Details";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

const DetailsStackScreen = ({ navigation }) => (
	<DetailsStack.Navigator
		initialRouteName="Details"
		screenOptions={{
			headerStyle: { backgroundColor: "#774c60" },
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		}}
	>
		<DetailsStack.Screen
			name="Details"
			component={DetailsScreen}
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
	</DetailsStack.Navigator>
);

const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={HomeStackScreen} />
				<Drawer.Screen name="Details" component={DetailsStackScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
