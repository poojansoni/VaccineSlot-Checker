import "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./src/components/context";
import AuthStackScreen from "./src/screens/AuthStackScreen";

import MainTabScreen from "./src/screens/MainTabScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HelpScreen from "./src/screens/HelpScreen";
import AboutScreen from "./src/screens/AboutScreen";

import { DrawerContent } from "./src/screens/DrawerContent";

const Drawer = createDrawerNavigator();

const App = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);

	const authContext = React.useMemo(() => ({
		signIn: () => {
			setUserToken("ugauv");
			setIsLoading(false);
		},
		signOut: () => {
			setUserToken(null);
			setIsLoading(false);
		},
		signUp: () => {
			setUserToken("ugauv");
			setIsLoading(false);
		},
	}));

	useEffect(
		//setTimeout(async() => {
		() => {
			setTimeout(() => {
				setIsLoading(false);
				// let userToken;
				// userToken = null;
				// try {
				//   userToken = await AsyncStorage.getItem('userToken');
				// } catch(e) {
				//   console.log(e);
				//}
				// // console.log('user token: ', userToken);
				// dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
			}, 1000);
		},
		[],
	);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator
					animating={true}
					size="large"
					style={{ opacity: 1 }}
					color="#789"
				/>
			</View>
		);
	}

	return (
		<AuthContext.Provider value={authContext}>
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
		</AuthContext.Provider>
	);
};

export default App;
