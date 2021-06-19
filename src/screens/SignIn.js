import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

const SignInScreen = ({ navigation }) => {
	const [data, setData] = React.useState({
		email: "",
		password: "",
		checkTextInputChange: false,
		secureTextEntry: true,
	});
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>
			<View style={styles.footer}>
				<Text style={styles.text_footer}>Email</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" color="#05375a" size={20} />
					<TextInput
						placeholder="email@gmail.com"
						style={styles.textInput}
						autoCapitalize="none"
					/>
					<Feather name="check-circle" color="green" size={20} />
				</View>
				<Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
				<View style={styles.action}>
					<Feather name="lock" color="#05375a" size={21} />
					<TextInput
						placeholder="Your password"
						secureTextEntry={true}
						style={styles.textInput}
						autoCapitalize="none"
					/>
					<Feather name="eye-off" color="grey" size={20} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#774c60",
	},
	header: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	footer: {
		flex: 3,
		backgroundColor: "#fff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	text_header: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 30,
	},
	text_footer: {
		color: "#05375a",
		fontSize: 18,
		marginBottom: 7,
	},
	action: {
		flexDirection: "row",
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#f2f2f2",
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: "row",
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#FF0000",
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === "ios" ? 0 : -12,
		paddingLeft: 10,
		color: "#05375a",
	},
	errorMsg: {
		color: "#FF0000",
		fontSize: 14,
	},
	button: {
		alignItems: "center",
		marginTop: 50,
	},
	signIn: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default SignInScreen;
