import React, { useContext, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Alert } from "react-native";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AuthContext from "../components/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function DrawerContent(props) {
	const profile =
		"https://www.pinclipart.com/picdir/middle/38-388919_computer-icons-user-profile-clip-art-avatar-user.png";
	const [data, setData] = React.useState({
		userEmail: "Your Name",
		userDp: profile,
	});

	const setEmail = async () => {
		let email = null;
		try {
			email = await AsyncStorage.getItem("userEmail");
			if (email) {
				setData({
					...data,
					userEmail: email,
				});
			} else {
				setData({
					...data,
					userEmail: "Your Name",
				});
			}
			console.log("EMAIL ", data.userEmail);
		} catch (error) {
			console.log("Something went wrong : ", error);
		}
	};
	// const setDP = async () => {
	// 	let dp = null;
	// 	try {
	// 		dp = await AsyncStorage.getItem("DP");
	// 		if (dp) {
	// 			setData({
	// 				...data,
	// 				userDp: dp,
	// 			});
	// 		} else {
	// 			setData({
	// 				...data,
	// 				userDp: profile,
	// 			});
	// 		}
	// 		console.log("DP ", data.userDp);
	// 	} catch (error) {
	// 		console.log("Something went wrong : ", error);
	// 	}
	// };
	const setUserProfile = async () => {
		setEmail();
		//setDP();
	};

	useEffect(() => {
		setUserProfile();
	}, []);

	const signOutHandler = () => {
		try {
			signOut();
		} catch (error) {
			Alert.alert("Error", "Something went wrong!", [{ text: "Okay" }]);
			return;
		}
	};
	const { signOut } = useContext(AuthContext);
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View
							style={{ flexDirection: "row", marginTop: 30, marginBottom: 5 }}
						>
							<Avatar.Image
								source={{
									uri: data.userDp,
								}}
								size={90}
							/>
						</View>
						<View
							style={{
								marginLeft: 15,
								flexDirection: "column",
								marginBottom: 20,
							}}
						>
							<Title style={styles.title}>{data.userEmail}</Title>
							<Caption style={styles.caption}>Be Safe and Vaccinate!</Caption>
						</View>
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={() => (
								<MaterialCommunityIcons
									name="home-outline"
									fontSize={24}
									size={24}
								/>
							)}
							label="Home"
							onPress={() => {
								props.navigation.navigate("Home");
							}}
						/>
						<DrawerItem
							icon={() => (
								<MaterialCommunityIcons
									name="bell-outline"
									fontSize={24}
									size={24}
								/>
							)}
							label="Slot Updates"
							onPress={() => {
								props.navigation.navigate("Notifications");
							}}
						/>
						<DrawerItem
							icon={() => (
								<MaterialCommunityIcons
									name="help-circle-outline"
									fontSize={24}
									size={24}
								/>
							)}
							label="Help"
							onPress={() => {
								props.navigation.navigate("HelpScreen");
							}}
						/>
						<DrawerItem
							icon={() => (
								<MaterialCommunityIcons
									name="cog-outline"
									fontSize={24}
									size={24}
								/>
							)}
							label="About"
							onPress={() => {
								props.navigation.navigate("AboutScreen");
							}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={() => (
						<MaterialCommunityIcons
							name="exit-to-app"
							fontSize={24}
							size={24}
						/>
					)}
					label="Sign Out"
					onPress={() => {
						signOutHandler();
					}}
				/>
			</Drawer.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: "bold",
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15,
	},
	paragraph: {
		fontWeight: "bold",
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
		marginLeft: 10,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: "#f4f4f4",
		borderTopWidth: 1,
		marginLeft: 10,
	},
	preference: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
