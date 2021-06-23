import React, { useEffect } from "react";
import { Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import DistrictContext from "../../components/districtContext";

const DistrictScreen = () => {
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

	const { states, getStates, getDistricts } = React.useContext(DistrictContext);

	useEffect(() => {
		getStates();
	}, []);

	// console.log(
	// 	"SCREEN RENDERED, isValidPin:",
	// 	isValidPin,
	// 	" SELECTED DATE: ",
	// 	selecteDate(),
	// );

	// agegroup true for 18 to 44 and false for abv
	// dosetype true for Dose1 and false for Dose2

	const [dist_data, setData] = React.useState({
		errorMessage: "",
		ageGroup: true,
		doseType: true,
	});

	const handleAgeGroup = () => {
		setData({ ...dist_data, ageGroup: !dist_data.ageGroup });
	};

	const handleDose = () => {
		setData({ ...dist_data, doseType: !dist_data.doseType });
	};

	const getUpdatesHandler = () => {
		console.log(states);
	};

	return (
		<View style={{ flex: 1 }}>
			{/* <Input
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
			/> */}

			<View>
				<Text style={styles.textStyle}>Age Group</Text>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<CheckBox
						title="18-44"
						checkedIcon="dot-circle-o"
						uncheckedIcon="circle-o"
						checked={dist_data.ageGroup}
						onPress={() => {
							if (!dist_data.ageGroup) {
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
						checked={!dist_data.ageGroup}
						onPress={() => {
							if (dist_data.ageGroup) {
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
						checked={dist_data.doseType}
						onPress={() => {
							if (!dist_data.doseType) {
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
						checked={!dist_data.doseType}
						onPress={() => {
							if (dist_data.doseType) {
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

export default DistrictScreen;
