import "react-native-gesture-handler";
import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthProvider } from "./src/components/authContext";
import AuthContext from "./src/components/authContext";
import AuthStackScreen from "./src/screens/AuthStackScreen";

import MainTabScreen from "./src/screens/MainTabScreen";

import {
	AboutStackScreen,
	HelpStackScreen,
} from "./src/screens/drawerStackScreen";
import AuthResolveScreen from "./src/screens/AuthResolveScreen";

import { DrawerContent } from "./src/screens/DrawerContent";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
	const { data } = useContext(AuthContext);
	const { token, triedLocalSignIn } = data;
	console.log("TOKEN:", token);
	console.log("IS_TRIEDLOCALSIGNIN:", triedLocalSignIn);

	return (
		<NavigationContainer>
			{token && (
				<Drawer.Navigator
					drawerContent={(props) => <DrawerContent {...props} />}
				>
					<Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
					<Drawer.Screen name="HelpScreen" component={HelpStackScreen} />
					<Drawer.Screen name="AboutScreen" component={AboutStackScreen} />
				</Drawer.Navigator>
			)}
			{!token && triedLocalSignIn && <AuthStackScreen />}
			{!token && !triedLocalSignIn && <AuthResolveScreen />}
		</NavigationContainer>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<AppNavigator />
		</AuthProvider>
	);
};

export default App;
