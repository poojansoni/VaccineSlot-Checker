import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";
import {
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from "react-native-paper";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export function DrawerContent(props) {
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
									uri: "https://www.pinclipart.com/picdir/middle/38-388919_computer-icons-user-profile-clip-art-avatar-user.png",
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
							<Title style={styles.title}>User Name</Title>
							<Caption style={styles.caption}>Be Safe and Vaccinate!</Caption>
						</View>
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={(color, size = 24) => (
								<MaterialCommunityIcons
									name="account-outline"
									color={color}
									size={size}
								/>
							)}
							label="Profile"
							onPress={() => {}}
						/>
						<DrawerItem
							icon={(color, size = 24) => (
								<MaterialCommunityIcons
									name="home-outline"
									color={color}
									size={size}
								/>
							)}
							label="Home"
							onPress={() => {}}
						/>
						<DrawerItem
							icon={(color, size = 24) => (
								<MaterialCommunityIcons
									name="help-circle-outline"
									color={color}
									size={size}
								/>
							)}
							label="Help"
							onPress={() => {}}
						/>
						<DrawerItem
							icon={(color, size = 24) => (
								<MaterialCommunityIcons
									name="cog-outline"
									color={color}
									size={size}
								/>
							)}
							label="About"
							onPress={() => {}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={(color, size = 24) => (
						<MaterialCommunityIcons
							name="exit-to-app"
							color={color}
							size={size}
						/>
					)}
					label="Sign Out"
					onPress={() => {}}
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
