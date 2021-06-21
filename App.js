import "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./src/components/context";
import AuthStackScreen from "./src/screens/AuthStackScreen";

import MainTabScreen from "./src/screens/MainTabScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HelpScreen from "./src/screens/HelpScreen";
import AboutScreen from "./src/screens/AboutScreen";

import { DrawerContent } from "./src/screens/DrawerContent";

const Drawer = createDrawerNavigator();

const App = () => {
	// const [isLoading, setIsLoading] = React.useState(true);
	// const [userToken, setUserToken] = React.useState(null);

	const initialLoginState = {
		isLoading: true,
		userEmail: null,
		userToken: null,
		userPass: "",
	};

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case "RETRIEVE_TOKEN":
				return {
					...prevState,
					userToken: action.token,
					isLoading: false,
				};
			case "LOGIN":
				return {
					...prevState,
					userEmail: action.id,
					userToken: action.token,
					userPass: action.password,
					isLoading: false,
				};
			case "LOGOUT":
				return {
					...prevState,
					userEmail: null,
					userToken: null,
					userPass: null,
					isLoading: false,
				};
			case "REGISTER":
				return {
					...prevState,
					userEmail: action.id,
					userToken: action.token,
					userPass: action.password,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = React.useReducer(
		loginReducer,
		initialLoginState,
	);

	const authContext = React.useMemo(
		() => ({
			signIn: async (userEmail, password) => {
				let userToken = null;
				if (userEmail == "email@gmail.com" && password == "password") {
					try {
						userToken = "abcdefgh";
						await AsyncStorage.setItem("userToken", userToken);
						await AsyncStorage.setItem("userEmail", userEmail);
					} catch (e) {
						console.log(e);
					}
				}
				dispatch({ type: "LOGIN", id: userEmail, token: userToken });
				// setUserToken("ugauv");
				// setIsLoading(false);
			},
			signOut: async () => {
				try {
					await AsyncStorage.removeItem("userToken");
					await AsyncStorage.removeItem("userEmail", userEmail);
				} catch (e) {
					console.log(e);
				}
				dispatch({ type: "LOGOUT" });
				// setUserToken(null);
				// setIsLoading(false);
			},
			signUp: async (userEmail, password) => {
				password = password;

				try {
					userToken = "abcdefgh";
					await AsyncStorage.setItem("userToken", userToken);
					await AsyncStorage.setItem("userEmail", userEmail);
				} catch (e) {
					console.log(e);
				}

				dispatch({ type: "LOGIN", id: userEmail, token: userToken });
				// setUserToken("ugauv");
				// setIsLoading(false);
			},
		}),
		[],
	);

	useEffect(() => {
		setTimeout(async () => {
			//setIsLoading(false);
			let userToken;
			userToken = null;
			try {
				userToken = await AsyncStorage.getItem("userToken");
			} catch (e) {
				console.log(e);
			}

			dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
		}, 1000);
	}, []);

	if (loginState.isLoading && loginState.userToken == null) {
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
				{loginState.userToken != null ? (
					<Drawer.Navigator
						drawerContent={(props) => <DrawerContent {...props} />}
					>
						<Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
						<Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
						<Drawer.Screen name="HelpScreen" component={HelpScreen} />
						<Drawer.Screen name="AboutScreen" component={AboutScreen} />
					</Drawer.Navigator>
				) : (
					<AuthStackScreen />
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export default App;
