import React, { useEffect, useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import cowinContext from "../../components/cowinContext";

const DistrictScreen = ({ navigation }) => {
	const maximumDate = new Date();
	maximumDate.setDate(maximumDate.getDate() + 6);

	//DATE VALUES
	const [date, setDate] = React.useState(null);
	const [show, setShow] = React.useState(false);

	//STATES VALUE
	const [stateOpen, setStateOpen] = useState(false);
	const [stateValue, setStateValue] = useState(null);
	const [stateItems, setStateItems] = useState([]);

	//District VALUE
	const [districtOpen, setDistrictOpen] = useState(false);
	const [districtValue, setDistrictValue] = useState(null);
	const [districtItems, setDistrictItems] = useState([]);

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

	const { states, districts, getStates, getDistricts, getDistrictResponse } =
		React.useContext(cowinContext);

	const setStates = () => {
		const stateArray = new Array();
		states.forEach((stateObj) => {
			stateArray.push({
				label: stateObj.state_name.toString(),
				value: stateObj.state_id,
			});
		});
		//console.log("ARRAY STATES: ", stateArray);
		setStateItems(stateArray);
		//console.log("SET STATES: ", stateItems);
	};

	const setDistricts = () => {
		const DistrictArray = new Array();
		districts.forEach((distObj) => {
			DistrictArray.push({
				label: distObj.district_name.toString(),
				value: distObj.district_id,
			});
		});
		//console.log("ARRAY STATES: ", stateArray);
		setDistrictItems(DistrictArray);
		//console.log("SET STATES: ", stateItems);
	};

	useEffect(() => {
		getStates();
	}, []);

	// agegroup true for 18 to 44 and false for abv
	// dosetype true for Dose1 and false for Dose2

	const [dist_data, setData] = React.useState({
		ageGroup: true,
		doseType: true,
	});

	const handleAgeGroup = () => {
		setData({ ...dist_data, ageGroup: !dist_data.ageGroup });
	};

	const handleDose = () => {
		setData({ ...dist_data, doseType: !dist_data.doseType });
	};

	const onStateOpen = useCallback(() => {
		setDistrictOpen(false);
	}, []);

	const onDistrictOpen = useCallback(() => {
		setStateOpen(false);
	}, []);

	const getUpdatesHandler = async () => {
		if (stateValue != null && districtValue != null) {
			try {
				// agegroup true for 18 to 44 and false for abv
				// dosetype true for Dose1 and false for Dose2
				let doseNum = dist_data.doseType ? 1 : 2;
				let age = dist_data.ageGroup ? 18 : 45;
				await getDistrictResponse(districtValue, selecteDate(), doseNum, age);
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
			<DropDownPicker
				onPress={() => {
					setStates();
				}}
				open={stateOpen}
				onOpen={onStateOpen}
				zIndex={3000}
				zIndexInverse={1000}
				value={stateValue}
				items={stateItems}
				setOpen={setStateOpen}
				setValue={setStateValue}
				setItems={setStateItems}
				onChangeValue={(val) => {
					if (val) {
						getDistricts(val);
					}
				}}
				placeholder="Select State"
				style={{ marginBottom: 30 }}
			/>

			{stateValue && (
				<DropDownPicker
					onPress={() => {
						setDistricts();
					}}
					open={districtOpen}
					onOpen={onDistrictOpen}
					zIndex={2000}
					zIndexInverse={2000}
					value={districtValue}
					items={districtItems}
					setOpen={setDistrictOpen}
					setValue={setDistrictValue}
					setItems={setDistrictItems}
					// onChangeValue={(val) => {
					// 	console.log("DISTRCT VALUE CHANGED: ", val);
					// }}
					placeholder="Select District"
					style={{ marginBottom: 25 }}
				/>
			)}

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

export default DistrictScreen;
