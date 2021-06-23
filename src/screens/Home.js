import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DistrictScreen from "./HomeMainAreaScreen/districtScreen";
import PincodeScreen from "./HomeMainAreaScreen/pincodeScreen";
import { PinProvider } from "../components/pinContext";
import { DistrictProvider } from "../components/districtContext";

const HomeScreen = ({ navigation }) => {
	const [data, setData] = React.useState({
		activeBtn: 0,
	});

	const setActiveBtn = () => {
		if (data.activeBtn === 0) {
			setData({
				...data,
				activeBtn: 1,
			});
		} else {
			setData({
				...data,
				activeBtn: 0,
			});
		}
		console.log("ACTIVE BUTTON VALUE : ", data.activeBtn);
	};
	return (
		<View style={styles.selector}>
			<View style={styles.option}>
				{/* 0 state defined for pincode */}

				<TouchableOpacity
					onPress={() => {
						if (data.activeBtn) {
							setActiveBtn();
						}
					}}
					style={styles.btn}
				>
					<Text
						style={!data.activeBtn ? styles.textActive : styles.textInactive}
					>
						By Pincode
					</Text>

					{/* 1 state defined for District */}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						if (!data.activeBtn) {
							setActiveBtn();
						}
					}}
					style={styles.btn}
				>
					<Text
						style={data.activeBtn ? styles.textActive : styles.textInactive}
					>
						By District
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.main}>
				{/* <CowinProvider> */}
				{!data.activeBtn ? (
					<PinProvider>
						<PincodeScreen />
					</PinProvider>
				) : (
					<DistrictProvider>
						<DistrictScreen />
					</DistrictProvider>
				)}
				{/* </CowinProvider> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	selector: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		// borderColor: "yellow",
		// borderWidth: 2,
	},
	option: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#fff",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		// borderColor: "red",
		// borderWidth: 5,
	},
	main: {
		flex: 5,
		flexDirection: "column",
		backgroundColor: "#fff",
		padding: 20,
		justifyContent: "center",
		// borderColor: "red",
		// borderWidth: 5,
	},
	btn: {
		backgroundColor: "#9998A1",
		marginLeft: 5,
		marginRight: 10,
		marginTop: 15,
		width: "42%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	textActive: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	textInactive: {
		color: "#774c60",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default HomeScreen;
