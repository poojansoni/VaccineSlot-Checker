import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ProfileScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Profile Screen</Text>
			{/* <Button
				title="Go to details"
				onPress={() => navigation.navigate("Details")}
			/> */}
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
	},
});

export default ProfileScreen;
