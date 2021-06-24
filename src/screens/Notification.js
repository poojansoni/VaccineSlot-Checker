import React from "react";
import { Text, View, ScrollView } from "react-native";
import cowinContext from "../components/cowinContext";

const NotificationScreen = () => {
	// console.log(
	// 	"UPDATE SCREEN RENDERED,\n ALL CENTERES: ",
	// 	AllCentres,
	// 	"/n state of data: ",
	// 	data,
	// );
	let AllCentres = "";
	const errMsg =
		"Sorry, but there were no available centres currently for your requirements";

	const GetCenterText = (obj) => {
		let res =
			"NAME: " +
			obj.NAME +
			"\n" +
			"MINIMUM AGE: " +
			obj.MIN_AGE +
			"\n" +
			"DOSE-1: " +
			obj.AVAILAIBLE_DOSE1 +
			"\n" +
			"DOSE-2: " +
			obj.AVAILAIBLE_DOSE2 +
			"\n" +
			"VACCINE-TYPE: " +
			obj.VACCINE_TYPE +
			"\n" +
			"ADDRESS: " +
			obj.ADDRESS +
			"\n_____________________________________________\n\n";

		return res;
	};

	const setAllCentres = (req, extra) => {
		AllCentres = req + extra;
	};

	const { data } = React.useContext(cowinContext);

	return (
		<ScrollView>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					paddingLeft: 35,
					paddingRight: 35,
					paddingBottom: 35,
				}}
			>
				{data != undefined && data.length != 0
					? data.forEach((obj) => {
							setAllCentres(AllCentres, GetCenterText(obj));
					  })
					: setAllCentres("", errMsg)}
				<Text
					style={
						AllCentres == errMsg
							? {
									paddingTop: 35,

									color: "red",
							  }
							: { paddingTop: 35 }
					}
				>
					{AllCentres}
				</Text>
			</View>
		</ScrollView>
	);
};

export default NotificationScreen;
