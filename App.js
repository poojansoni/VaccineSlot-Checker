import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Home Screen</Text>
			<StatusBar style="auto" />
		</View>
	);
};

export default function App() {
	return (
		<NavigationContainer style={styles.container}>
			<Text>Home Screen</Text>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
	},
});
