import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const AboutScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>
				This Application's sole purpose is to keep you in track with upcoming
				Vaccine slots available according to your prefernce. Please go to Help
				Page to know how to use App.
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 50,
		fontSize: 10000,
	},
});

export default AboutScreen;
