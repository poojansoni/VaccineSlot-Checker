import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const HelpScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>
				In your Home screen you have Two options to get available slot details.
			</Text>
			<Text>First is Get by pincode and second is by District</Text>
			<Text>
				Select all the values correctly and get updates on the Notification
				screen
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		padding: 50,
		marginBottom: 50,
	},
});

export default HelpScreen;
