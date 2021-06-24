import React from "react";
import { Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Text, View } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import PinContext from "../../components/pinContext";
import cowinContext from "../../components/cowinContext";

const PincodeScreen = ({ navigation }) => {
	const maximumDate = new Date();
	maximumDate.setDate(maximumDate.getDate() + 6);

	const [date, setDate] = React.useState(null);
	const [show, setShow] = React.useState(false);

	const onChangeDate = (event, selectedDate) => {
		setShow(Platform.OS === "ios");
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	const selecteDate = () => {
		const d =
			(date.getDate() < 10 ? "0" : "") +
			date.getDate().toString() +
			"-" +
			(date.getMonth() < 9 ? "0" : "") +
			(date.getMonth() + 1).toString() +
			"-" +
			date.getFullYear().toString();
		return d;
	};

	const { isValidPin, checkPincode } = React.useContext(PinContext);
	const { getPinResponse } = React.useContext(cowinContext);

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

	const verifyIndianPin = async (val) => {
		if (
			(val != null && pin_data.pincode.trim().length < 6) ||
			pin_data.pincode == 0
		) {
			setData({
				...pin_data,
				errorMessage: "6 digit pincode required!",
			});
		} else {
			setData({
				...pin_data,
				errorMessage: "6 digit pincode required!",
				pincode: pin_data.pincode,
			});
			await checkPincode(pin_data.pincode);
		}
	};

	const handleAgeGroup = () => {
		setData({ ...pin_data, ageGroup: !pin_data.ageGroup });
	};

	const handleDose = () => {
		setData({ ...pin_data, doseType: !pin_data.doseType });
	};

	const getUpdatesHandler = async () => {
		if (isValidPin && date != null) {
			try {
				// agegroup true for 18 to 44 and false for abv
				// dosetype true for Dose1 and false for Dose2
				let doseNum = pin_data.doseType ? 1 : 2;
				let age = pin_data.ageGroup ? 18 : 45;
				await getPinResponse(pin_data.pincode, selecteDate(), doseNum, age);
				navigation.navigate("Notifications");
				// Alert.alert(
				// 	"Success",
				// 	"Please vist update section for Center Details",
				// 	[{ text: "Okay" }],
				// );
			} catch (err) {
				Alert.alert("Error", "Something went wrong! ");
			}
		} else {
			Alert.alert("Error", "Please set all the fields");
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Input
				label="Pincode"
				placeholder="- - - - - -"
				rightIcon={{
					type: "font-awesome",
					name: "map-marker",
					color: "#774c60",
				}}
				keyboardType="numeric"
				errorMessage={isValidPin ? "Valid pincode" : pin_data.errorMessage}
				errorStyle={isValidPin ? { color: "green" } : { color: "red" }}
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

			<View style={{ marginTop: 110 }}>
				<View
					style={{
						alignItems: "center",
						marginBottom: 7,
						flexDirection: "row",
					}}
				>
					<Text style={[styles.textStyle, { color: "#444" }]}>
						Selected Date:
					</Text>
					{date != null ? (
						<Text style={{ fontWeight: "bold", color: "#555" }}>
							{"  " +
								(date.getDate() < 10 ? "0" : "") +
								date.getDate().toString() +
								"-" +
								(date.getMonth() < 9 ? "0" : "") +
								(date.getMonth() + 1).toString() +
								"-" +
								date.getFullYear().toString()}
						</Text>
					) : null}
				</View>
				<Button
					onPress={() => {
						showDatepicker();
					}}
					title="Pick a date"
					buttonStyle={styles.book_btn}
				/>
				{show && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date ? date : new Date()}
						mode={"date"}
						display="default"
						onChange={onChangeDate}
						maximumDate={maximumDate}
						minimumDate={new Date()}
					/>
				)}
			</View>

			<View style={{ marginTop: 17, marginBottom: 50 }}>
				<Button
					title="Get Updates"
					buttonStyle={styles.update_btn}
					titleStyle={{ color: "#774c60", fontWeight: "bold" }}
					onPress={() => {
						getUpdatesHandler();
					}}
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
