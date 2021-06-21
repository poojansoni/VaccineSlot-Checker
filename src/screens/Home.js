import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Home Screen</Text>
			{/* <Text>Android id: {Application.androidId}</Text>
			<Text>application id: {Application.applicationId}</Text>
			<Text>apllication name: {Application.applicationName}</Text> */}

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

export default HomeScreen;
