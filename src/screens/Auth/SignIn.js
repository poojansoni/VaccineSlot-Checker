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

import AuthContext from "../../components/authContext";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

const SignInScreen = ({ navigation }) => {
	//console.log("SIGN IN SCREEN RERENDERED");
	const [data, setData] = React.useState({
		userEmail: "",
		password: "",
		checkTextInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true,
	});
	const { signIn } = React.useContext(AuthContext);

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				userEmail: val,
				checkTextInputChange: true,
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

	const handleValidUserEmail = (val) => {
		var validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (val.trim().length >= 6 && val.match(validRegex)) {
			setData({
				...data,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				isValidUser: false,
				checkTextInputChange: false,
			});
		}
	};

	const loginHandle = () => {
		if (data.userEmail.length == 0 || data.password.length == 0) {
			Alert.alert("Empty Input!", "Email or password field cannot be empty.", [
				{ text: "Okay" },
			]);
			return;
		}
		if (!data.isValidPassword || !data.isValidUser) {
			Alert.alert("Invalid User!", "Email or password is incorrect.", [
				{ text: "Okay" },
			]);
			return;
		}
		try {
			signIn(data.userEmail, data.password);
		} catch (error) {
			Alert.alert("Invalid User!", "Email or password is incorrect.", [
				{ text: "Okay" },
			]);
			return;
		}
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
						autoCorrect={false}
						onChangeText={(val) => textInputChange(val)}
						onEndEditing={(e) => handleValidUserEmail(e.nativeEvent.text)}
					/>
					{data.isValidUser && data.checkTextInputChange ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>

				{data.isValidUser ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>Invalid Email</Text>
					</Animatable.View>
				)}
				{/* PASSWORD INPUT */}

				<Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
				<View style={styles.action}>
					<Feather name="lock" color="#05375a" size={21} />
					<TextInput
						placeholder="Your password"
						secureTextEntry={data.secureTextEntry}
						style={styles.textInput}
						autoCapitalize="none"
						autoCorrect={false}
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

				{data.isValidPassword ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Password must be 8 characters long.
						</Text>
					</Animatable.View>
				)}

				{/* FORGOT PASSWORD */}

				{/* <TouchableOpacity>
					<Text style={{ color: "#009387", marginTop: 15 }}>
						Forgot password?
					</Text>
				</TouchableOpacity> */}

				{/* SIGN IN BUTTON */}

				<View style={styles.button}>
					<TouchableOpacity
						style={styles.signIn}
						onPress={() => {
							// 	signIn();
							// }}
							loginHandle();
						}}
					>
						<LinearGradient
							colors={["#08d4c4", "#01ab9d"]}
							style={styles.signIn}
						>
							<Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
						</LinearGradient>
					</TouchableOpacity>

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
