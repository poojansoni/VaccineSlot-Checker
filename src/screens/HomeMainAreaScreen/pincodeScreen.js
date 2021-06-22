import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import PinContext from "../../components/pinContext";

const PincodeScreen = () => {
	const { data, checkPincode } = React.useContext(PinContext);

	// agegroup true for 18 to 44 and false for abv
	// dosetype true for Dose1 and false for Dose2
	const [pin_data, setData] = React.useState({
		errorMessage: "",
		pincode: 0,
		ageGroup: true,
		doseType: true,
	});

	const handlePincodeValidation = (pin) => {
		if (pin.trim().length > 6) {
			setData({
				...pin_data,
				errorMessage: "6 digit pincode required!",
			});
		} else {
			setData({ ...pin_data, errorMessage: "", pincode: pin });
		}
	};

	const verifyIndianPin = () => {
		checkPincode(pin_data.pincode);
		console.log("IS PIN VALID? : ", data.isValidPin);
	};

	const handleAgeGroup = () => {
		setData({ ...pin_data, ageGroup: !pin_data.ageGroup });
	};

	const handleDose = () => {
		setData({ ...pin_data, doseType: !pin_data.doseType });
	};

	return (
		<View>
			<Input
				label="Pincode"
				placeholder="- - - - - -"
				rightIcon={{
					type: "font-awesome",
					name: "map-marker",
					color: "#774c60",
				}}
				keyboardType="numeric"
				errorMessage={pin_data.errorMessage}
				onChangeText={(value) => {
					handlePincodeValidation(value);
				}}
				onEndEditing={() => {
					verifyIndianPin();
				}}
			/>

			<View>
				<Text style={styles.textStyle}>Age Group</Text>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<CheckBox
						title="18-44"
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						checked={pin_data.ageGroup}
						onPress={() => {
							if (!pin_data.ageGroup) {
								handleAgeGroup();
							}
						}}
						checkedColor="#774c60"
						uncheckedColor="#774c60"
						containerStyle={[styles.ageGroupStyle, { paddingLeft: 65 }]}
					/>
					<CheckBox
						title="45+"
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						checked={!pin_data.ageGroup}
						onPress={() => {
							if (pin_data.ageGroup) {
								handleAgeGroup();
							}
						}}
						checkedColor="#774c60"
						uncheckedColor="#774c60"
						containerStyle={styles.ageGroupStyle}
					/>
				</View>
			</View>

			<View style={{ marginTop: 60 }}>
				<Text style={[styles.textStyle, {}]}>Dose</Text>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<CheckBox
						title="Dose 1"
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						checked={pin_data.doseType}
						onPress={() => {
							if (!pin_data.doseType) {
								handleDose();
							}
						}}
						checkedColor="#774c60"
						uncheckedColor="#774c60"
						containerStyle={[styles.ageGroupStyle, { paddingLeft: 65 }]}
					/>
					<CheckBox
						title="Dose 2"
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						checked={!pin_data.doseType}
						onPress={() => {
							if (pin_data.doseType) {
								handleDose();
							}
						}}
						checkedColor="#774c60"
						uncheckedColor="#774c60"
						containerStyle={styles.ageGroupStyle}
					/>
				</View>
			</View>

			<View style={{ marginTop: 120 }}>
				<Button title="Book Now" buttonStyle={styles.book_btn} />
			</View>

			<View style={{ marginTop: 17, marginBottom: 50 }}>
				<Button
					title="Get Updates"
					buttonStyle={styles.update_btn}
					titleStyle={{ color: "#774c60", fontWeight: "bold" }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	ageGroupStyle: {
		backgroundColor: "#fff",
		borderWidth: 0,
		padding: 20,
	},
	textStyle: {
		fontSize: 15,
		color: "#8c8c8f",
		fontWeight: "bold",
		paddingLeft: 10,
	},
	book_btn: {
		backgroundColor: "#774c60",
		borderRadius: 40,
	},
	update_btn: {
		borderColor: "#774c60",
		backgroundColor: "#fff",
		borderWidth: 3,
		borderRadius: 40,
	},
});

export default PincodeScreen;
