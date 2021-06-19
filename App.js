import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AuthStackScreen from "./src/screens/AuthStackScreen";

import MainTabScreen from "./src/screens/MainTabScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HelpScreen from "./src/screens/HelpScreen";
import AboutScreen from "./src/screens/AboutScreen";

import { DrawerContent } from "./src/screens/DrawerContent";

const Drawer = createDrawerNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<AuthStackScreen>
				{/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
				<Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
				<Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
				<Drawer.Screen name="HelpScreen" component={HelpScreen} />
				<Drawer.Screen name="AboutScreen" component={AboutScreen} />
			</Drawer.Navigator> */}
			</AuthStackScreen>
		</NavigationContainer>
	);
};

export default App;
