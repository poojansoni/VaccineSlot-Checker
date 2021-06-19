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
	TextInputBase,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

const SignInScreen = ({ navigation }) => {
	const [data, setData] = React.useState({
		userEmail: "",
		password: "",
		checkTextInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true,
	});

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				userEmail: val,
				checkTextInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				userEmail: val,
				checkTextInputChange: false,
				isValidUser: false,
			});
		}
	};

	const handlePasswordChange = (val) => {
		if (val.trim().length >= 8) {
			setData({
				...data,
				password: val,
				isValidPassword: true,
			});
		} else {
			setData({
				...data,
				password: val,
				isValidPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#774c60" barStyle="light-content" />

			{/* HEADER */}

			<View style={styles.header}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>

			{/* FOOTER */}

			<Animatable.View animation="fadeInUpBig" style={styles.footer}>
				{/* EMAIL INPUT  */}

				<Text style={styles.text_footer}>Email</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" color="#05375a" size={20} />
					<TextInput
						placeholder="email@gmail.com"
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={(val) => textInputChange(val)}
					/>
					{data.checkTextInputChange ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>

				{/* PASSORD INPUT */}

				<Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
				<View style={styles.action}>
					<Feather name="lock" color="#05375a" size={21} />
					<TextInput
						placeholder="Your password"
						secureTextEntry={data.secureTextEntry}
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={(val) => handlePasswordChange(val)}
					/>
					<TouchableOpacity onPress={() => updateSecureTextEntry()}>
						{data.secureTextEntry ? (
							<Feather name="eye-off" color="grey" size={20} />
						) : (
							<Feather name="eye" color="grey" size={20} />
						)}
					</TouchableOpacity>
				</View>

				{/* SIGN IN BUTTON */}

				<View style={styles.button}>
					<LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
						<Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
					</LinearGradient>

					{/* SIGN UP BUTTON */}

					<TouchableOpacity
						onPress={() => navigation.navigate("SignUpScreen")}
						style={[
							styles.signIn,
							{
								borderColor: "#07B0A2",
								borderWidth: 1,
								marginTop: 15,
							},
						]}
					>
						<Text
							style={[
								styles.textSign,
								{
									color: "#08BFB0",
								},
							]}
						>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
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
		borderRadius: 50,
	},
	textSign: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default SignInScreen;
